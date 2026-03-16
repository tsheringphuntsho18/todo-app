# TodoList Application

## Overview

TodoList is a full-stack task management application built with modern web technologies. It provides users with an intuitive interface to create, read, update, and delete tasks efficiently. The application follows a microservices architecture pattern with a decoupled frontend and backend, enabling independent scaling and deployment.

### Key Features

- **Task Management**: Create, view, update, and delete tasks with ease
- **Real-time Synchronization**: Instant updates across the application
- **Responsive Design**: Seamless experience across all devices
- **Containerized Deployment**: Docker support for consistent environments
- **Scalable Architecture**: Microservices-based design for horizontal scaling

## Technology Stack

### Frontend
- **React 19.2.4**: A JavaScript library for building user interfaces with component-based architecture
- **React DOM**: Rendering React components to the DOM
- **React Scripts**: Build configuration and scripts for Create React App

**Build Tools:**
- Webpack (via react-scripts)
- Babel for ES6+ transpilation
- PostCSS & Autoprefixer for CSS optimization

### Backend
- **Node.js & Express 5.2.1**: Lightweight HTTP server framework for RESTful API endpoints
- **PostgreSQL 8.11.3**: Relational database management system for persistent data storage
- **Sequelize 6.35.2**: Promise-based ORM for database abstraction and query building
- **CORS 2.8.6**: Cross-Origin Resource Sharing middleware for secure cross-domain requests
- **dotenv 17.3.1**: Environment variable management for configuration

**Development Tools:**
- Nodemon: Automatic server restart on file changes during development

### DevOps & Deployment
- **Docker**: Containerization for consistent deployment across environments
- **Render**: Cloud platform for CI/CD and application hosting

## Project Structure

```
todolist/
├── frontend/                 
│   ├── public/              
│   │   ├── index.html       
│   │   ├── manifest.json    
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js           
│   │   ├── App.css          
│   │   ├── index.js         
│   │   └── App.test.js      
│   ├── package.json         
│   └── Dockerfile           
│
├── backend/                 
│   ├── server.js            
│   ├── package.json         
│   ├── Dockerfile           
│   └── .env                 
│
├── render.yaml              
└── README.md               
```

## Architecture Overview

The application follows a **three-tier architecture**:

```
┌─────────────────┐
│   React UI      │ ← Frontend Layer (Port 3000)
│   (SPA)         │
└────────┬────────┘
         │
         │ HTTP/REST API (CORS-enabled)
         │
┌────────▼────────────────┐
│   Express REST API      │ ← Application Layer (Port 5000)
│   (/tasks endpoints)    │
└────────┬────────────────┘
         │
         │ SQL Queries (Sequelize ORM)
         │
┌────────▼────────────────┐
│   PostgreSQL Database   │ ← Data Layer
│   (Tasks Table)         │
└─────────────────────────┘
```

## Getting Started

### Prerequisites

- **Node.js** v14.0.0 or higher
- **npm** v6.0.0 or higher
- **Docker** and **Docker Compose** (for containerized setup)
- **PostgreSQL** 12+ (if running locally without Docker)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd todolist
```

#### 2. Backend Configuration

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todoapp
PORT=5000
NODE_ENV=development
```

Start the backend development server:

```bash
npm start
```

The API will be available at `http://localhost:5000`

#### 3. Frontend Configuration

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

### Running with Docker

Build and run both services using Docker:

```bash
docker-compose up --build
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## API Documentation

### Endpoints

All endpoints return JSON responses and support standard HTTP status codes.

#### Create Task
```
POST /api/tasks
Content-Type: application/json

Request Body:
{
  "title": "Task description"
}

Response: 201 Created
{
  "id": 1,
  "title": "Task description",
  "completed": false,
  "createdAt": "2026-03-16T10:30:00Z",
  "updatedAt": "2026-03-16T10:30:00Z"
}
```

#### Get All Tasks
```
GET /api/tasks

Response: 200 OK
[
  {
    "id": 1,
    "title": "Task 1",
    "completed": false,
    "createdAt": "2026-03-16T10:30:00Z"
  }
]
```

#### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json

Request Body:
{
  "title": "Updated task",
  "completed": true
}

Response: 200 OK
```

#### Delete Task
```
DELETE /api/tasks/:id

Response: 204 No Content
```

## Development

### Running Tests

**Frontend Tests:**
```bash
cd frontend
npm test
```

**Backend Tests:**
```bash
cd backend
npm test
```

### Code Quality

The project uses ESLint for code linting:

```bash
npm run lint
```

### Building for Production

**Frontend Build:**
```bash
cd frontend
npm run build
```

Creates an optimized production build in the `build/` directory.

**Backend:**
No additional build step required; runs directly from source.

## Deployment

### Deployment to Render

This project is configured for one-click deployment to Render using the `render.yaml` configuration file.

**Current Deployment:**
- **Backend Service**: `be-todo` (Free Tier)
- **Frontend Service**: `fe-todo` (Free Tier)
- **Database**: PostgreSQL on Render

**Deploy Steps:**
1. Push code to your Git repository
2. Connect repository to Render
3. Render automatically reads `render.yaml` and deploys both services
4. Services are automatically linked via environment variables

### Environment Variables (Production)

Backend:
- `DB_HOST`: PostgreSQL database host
- `DB_PORT`: Database connection port
- `DB_USER`: Database user credentials
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `PORT`: Server port (default: 5000)

Frontend:
- `REACT_APP_API_URL`: Backend API URL

## Performance Considerations

- **Database Indexing**: Tasks are indexed by primary key for O(1) lookup
- **Connection Pooling**: Sequelize manages database connection pooling
- **CORS Optimization**: Only necessary headers are transmitted
- **Static Asset Caching**: React production build includes cache-busting
- **Compression**: Express automatically compresses responses (with compression middleware)

## Security Best Practices

- ✅ Environment variables for sensitive credentials
- ✅ CORS policy enforcement for API access
- ✅ Input validation via Sequelize models
- ✅ SQL injection protection through ORM abstraction
- ✅ No hardcoded secrets in version control

**Recommended Enhancements:**
- Implement JWT authentication
- Add request rate limiting
- Implement HTTPS/TLS encryption
- Add input sanitization middleware
- Implement comprehensive logging

## Troubleshooting

### Backend Connection Issues
```
Error: connect ECONNREFUSED
```
**Solution**: Ensure PostgreSQL is running and environment variables are correctly configured.

### CORS Errors
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: Verify `REACT_APP_API_URL` matches the backend service URL and CORS middleware is enabled.

### Port Already in Use
```
Error: listen EADDRINUSE
```
**Solution**: Kill existing process on the port or change `PORT` environment variable.

## Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## Support

For issues, questions, or feature requests, please open an issue in the repository.

---

**Last Updated**: March 16, 2026  
**Current Version**: 1.0.0

