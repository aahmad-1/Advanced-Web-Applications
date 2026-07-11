# Full-Stack Book Library Application

> Simple full-stack web application for adding books to a MongoDB database and viewing them through dynamic React routes.

**Tech Stack:** React, TypeScript, Express, MongoDB (Mongoose), React Router, Vite

---

## Features

- Add books through a React form
- Store books in MongoDB
- View individual books using dynamic routes
- React Router based client-side routing
- Express REST API
- Development proxy using Vite
- Production build served directly by Express
- 404 page

---

## Project Structure

```
Exercise 12/
├── client/                 # React frontend
├── server/                 # Express backend
├── package.json            # Root scripts
└── requirements.txt
```

---

## Quick Start

### Prerequisites

- Node.js
- MongoDB running locally

---

### Installation

**1. Clone the repository**

```bash
git clone <repository-url>
cd Exercise\ 12
```

**2. Install dependencies**

```bash
npm install
```
---

## Development Mode

Open **two terminals**.

### Terminal 1

```powershell
$env:NODE_ENV="development"; npm run dev:server
```

### Terminal 2

```bash
npm run dev:client
```

Open:

```
http://localhost:3000
```

---

## Production Mode

Build the React application:

```bash
npm run build
```

Start the production server:

```powershell
$env:NODE_ENV="production"; npm start
```

Open:

```
http://localhost:1234
```

---

## API Endpoints

### Add a book

```
POST /api/book
```

Example body:

```json
{
  "name": "Little Bear",
  "author": "Else Holmelund Minarik",
  "pages": 63
}
```

---

### Get a book

```
GET /api/book/:name
```

Example:

```
GET /api/book/Little%20Bear
```

---

## Concepts Applied

- React
- TypeScript
- Express
- MongoDB with Mongoose
- REST API design
- React Router
- Vite proxy configuration
- CORS
- Production vs Development environments
- Full-stack application deployment