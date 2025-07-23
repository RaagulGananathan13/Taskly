CREATE TABLE IF NOT EXISTS task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50),
  category VARCHAR(100),
  dueDate DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ensure root password is set
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'root'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;