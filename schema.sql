DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  description_es TEXT,
  thumbnail TEXT,
  project_url TEXT,
  date TEXT
);

CREATE TABLE images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER,
  url TEXT,
  FOREIGN KEY(project_id) REFERENCES projects(id)
);

-- Seed Data (Optional - remove if not needed)
INSERT INTO projects (title, description, thumbnail, date) VALUES 
('Neon Nexus', 'A cyberpunk city builder with real-time economy and AI citizens.', 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '2025-11-04'),
('Void Drifter', 'Space exploration visualizer using Three.js and NASA APIs.', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '2025-08-15');

INSERT INTO images (project_id, url) VALUES 
(1, 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'),
(1, 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'),
(2, 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');
