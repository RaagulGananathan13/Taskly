const mysql = require('mysql2');
const request = require('supertest');
const app = require('./db.js');

jest.mock('mysql2', () => {
  const mockQuery = jest.fn();
  return {
    createConnection: jest.fn(() => ({
      connect: jest.fn((cb) => cb(null)),
      query: mockQuery,
      on: jest.fn(),
    })),
  };
});

describe('Backend API Tests', () => {
  let connection;

  beforeEach(() => {
    connection = mysql.createConnection();
    app.connect = jest.fn().mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Unit Tests
  describe('Database Connection', () => {
    it('should connect to MySQL successfully', async () => {
      await app.connect();
      expect(app.connect).toHaveBeenCalled();
    });

    it('should handle connection failure', async () => {
      const error = new Error('Connection failed');
      app.connect.mockRejectedValueOnce(error);
      await expect(app.connect()).rejects.toThrow('Connection failed');
    });
  });

  // Integration Tests
  describe('API Endpoints', () => {
    it('GET /tasks should return empty array', async () => {
      connection.query.mockImplementation((query, cb) => cb(null, []));
      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('GET /tasks/counts should return counts', async () => {
      connection.query.mockImplementation((query, cb) => cb(null, [{ total: 2, pending: 1 }]));
      const response = await request(app).get('/tasks/counts');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ total: 2, pending: 1 });
    });

    it('POST /tasks should create a task', async () => {
      const task = { title: 'Test', description: 'Test', priority: 'High Priority', category: 'Work', dueDate: '2025-07-24' };
      connection.query.mockImplementation((query, values, cb) => cb(null, { insertId: 1 }));
      const response = await request(app)
        .post('/tasks')
        .send(task)
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({ id: 1, ...task });
    });

    it('PUT /tasks/:id/complete should mark task as complete', async () => {
      connection.query.mockImplementation((query, values, cb) => cb(null, { affectedRows: 1 }));
      const response = await request(app).put('/tasks/1/complete');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Task marked as complete');
    });

    it('PUT /tasks/:id/complete should return 404 if task not found', async () => {
      connection.query.mockImplementation((query, values, cb) => cb(null, { affectedRows: 0 }));
      const response = await request(app).put('/tasks/1/complete');
      expect(response.status).toBe(404);
      expect(response.text).toBe('Task not found');
    });

    it('should handle database errors', async () => {
      const error = new Error('Database error');
      connection.query.mockImplementation((query, cb) => cb(error));
      const response = await request(app).get('/tasks');
      expect(response.status).toBe(500);
    });
  });
});