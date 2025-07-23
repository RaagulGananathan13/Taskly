# Taskly

Taskly is a full-stack to-do app built for a Full Stack Engineer assignment. Users can add tasks, view the 5 most recent, and mark them as completed. Built with React, Node.js, and MySQL, the app is fully containerized using Docker and orchestrated with Docker Compose.

## Overview

- **Frontend**: A Single Page Application (SPA) built with React and Vite, styled with Tailwind CSS.
- **Backend**: A RESTful API implemented with Node.js and Express, providing task management endpoints.
- **Database**: MySQL, storing tasks in a `task` table.
- **Deployment**: Dockerized with `docker-compose` for all components.

## Features

- Create to-do tasks with a title and description via the web UI.
- Display the 5 most recent to-do tasks.
- Mark tasks as completed, removing them from the UI.
- REST API endpoints for CRUD operations.

## Prerequisites

- Docker and Docker Compose installed on your system.
- A Linux development environment with Bash and GNU tools (assumed for evaluation).

## Installation and Setup

1. **Clone the Repository**:

   git clone <your-github-repo-url>
   cd Taskly

2. **Build and Run the Application**:

   docker-compose up --build

3. **Access the Application**:

   Open your browser and navigate to `http://localhost` to access the Taskly web interface.

4. **Stop the Application**:

   docker-compose down

5. ## Testing

- **Current Status**: Unit tests for database connection and integration tests for API endpoints are implemented using Jest and Supertest in the backend. All 8 tests pass with 68.51% statement coverage. Frontend unit tests for the Home component are implemented using React Testing Library.
- **Running Tests**:
  - Backend: Navigate to `backend/` and run `npm test` or `npm run test:coverage` for coverage reports (view `coverage/lcov-report/index.html`).