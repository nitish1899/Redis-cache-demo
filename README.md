# 🚀 Redis Cache Demo

A simple Node.js app demonstrating how to use **Redis** as a caching layer, containerized with **Docker**, and deployed using a full **CI/CD pipeline** via **GitHub Actions**.

---

## 📦 Tech Stack

- **Node.js + Express** – Backend API
- **Redis** – Caching
- **Docker & Docker Compose** – Containerization
- **GitHub Actions** – CI/CD pipeline
- **Docker Hub** – Image registry

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/redis-cache-demo.git
cd redis-cache-demo
```

### 2. Start with Docker Compose

```
docker-compose -f docker-compose.dev.yml up
```

The Node app will be running at: http://localhost:3001

### 3. Docker Commands

Build Image (Manually)

```
docker build -t <your-dockerhub-username>/redis-cache-demo .
```

### 4.Run Container

```
docker run -p 3000:3000 <your-dockerhub-username>/redis-cache-demo
```

### 5.CI/CD Setup

This project uses GitHub Actions to:

Build Docker image

Push it to Docker Hub

Deploy to production via SSH (e.g., AWS EC2, DigitalOcean)

### 6. Required GitHub Secrets

| Secret Name           | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `DOCKER_HUB_USERNAME` | Your Docker Hub username                                            |
| `DOCKER_HUB_TOKEN`    | Docker Hub [Access Token](https://hub.docker.com/settings/security) |
| `SSH_PRIVATE_KEY`     | Private SSH key to access the server                                |
| `PRODUCTION_SERVER`   | Public IP or domain of your server                                  |
| `PRODUCTION_SSH_USER` | Typically `ubuntu`, `ec2-user`, etc.                                |

### 7. Deployment Flow

On every push to main:
Docker image is built and pushed to Docker Hub
Server pulls the latest code and image
Docker containers are restarted via docker-compose.prod.yml

## Future Improvements

If you want to make it even more production-grade:

- Add basic tests to run before the image is built.
- Add error notifications (Slack/Email) if deployment fails.
- Add rollback logic if the new deployment fails.

## Useful Commands

Check running containers

```
docker ps
```

View logs

```
docker-compose logs -f
```
