# VaultX
Own your code history. VaultX is an open-source, self-hosted VCS built on MERN and AWS — no third-party platforms, full data sovereignty.

# 🗂️ VaultX — Self-Hosted Version Control System

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloud-AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

> A full-featured, self-hosted version control system built on the MERN stack and deployed on AWS — giving teams complete ownership over their code history, branches, and collaboration workflows.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Environment Variables](#environment-variables)
- [AWS Deployment](#-aws-deployment)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 Overview

**VaultX** is an open-source, self-hosted version control system inspired by Git and GitHub — but built entirely from scratch using the MERN stack. It gives individuals and teams full control over their repositories, commit history, branching, and collaboration features without relying on third-party platforms.

Designed for developers who want:
- **Data sovereignty** — all code stays on your own infrastructure
- **Custom workflows** — tailor permissions, branching rules, and CI hooks
- **Full auditability** — every change, merge, and access is logged

---

## ✨ Features

- 📁 **Repository Management** — Create, clone, fork, and archive repos
- 🌿 **Branching & Merging** — Full branch lifecycle with merge conflict detection
- 📝 **Commit History** — Diff viewer, file tree snapshots, and author tracking
- 👥 **User & Team Management** — Role-based access control (Owner / Maintainer / Developer / Viewer)
- 🔀 **Pull Requests** — Code review workflows with inline comments and approvals
- 🔔 **Webhooks & Notifications** — Trigger external services on push/merge events
- 🔐 **SSH & Token Auth** — Secure repository access via SSH keys or personal access tokens
- 🗃️ **Object Storage** — Raw file blobs stored on AWS S3
- 📊 **Activity Dashboard** — Contribution graphs, commit stats, and repo insights
- 🌐 **REST API** — Fully documented API for all core operations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS, React Router, Zustand |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas / MongoDB on EC2 |
| **File Storage** | AWS S3 (blob/object storage) |
| **Auth** | JWT + Refresh Tokens, SSH Key Auth |
| **Queue / Jobs** | AWS SQS + Bull (background processing) |
| **Hosting** | AWS EC2 (backend), AWS S3 + CloudFront (frontend) |
| **CI/CD** | GitHub Actions → AWS CodeDeploy |
| **Reverse Proxy** | Nginx |
| **Containerization** | Docker + Docker Compose |
| **Monitoring** | AWS CloudWatch + Winston logger |

---

## 🏗️ Architecture


┌──────────────────────────────┐
                     │        CloudFront CDN         │
                     │   (React SPA via S3 bucket)   │
                     └──────────────┬───────────────┘
                                    │ HTTPS
                     ┌──────────────▼───────────────┐
                     │        AWS EC2 Instance        │
                     │  ┌──────────────────────────┐ │
                     │  │   Nginx (Reverse Proxy)   │ │
                     │  └────────────┬─────────────┘ │
                     │               │               │
                     │  ┌────────────▼─────────────┐ │
                     │  │   Express.js API Server   │ │
                     │  │     (Node.js / PM2)        │ │
                     │  └────────────┬─────────────┘ │
                     └───────────────┼───────────────┘
                ┌──────────┬─────────┴──────────┐
                │          │                     │
      ┌─────────▼──┐  ┌───▼────────┐  ┌────────▼──────┐
      │  MongoDB    │  │  AWS S3    │  │   AWS SQS     │
      │  (Atlas /   │  │  (Blobs,   │  │  (Job Queue)  │
      │   EC2)      │  │   Assets)  │  │               │
      └─────────────┘  └────────────┘  └───────────────┘



      ---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x or yarn
- MongoDB >= 6.x (local or Atlas URI)
- Docker & Docker Compose (optional but recommended)
- AWS account with S3 bucket + IAM credentials

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/vaultx.git
cd vaultx

# 2. Install dependencies for both client and server
cd server && npm install
cd ../client && npm install

# 3. Set up environment variables (see below)
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Start with Docker Compose (recommended)
docker-compose up --build

# OR start manually
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm start
```

App will be available at `http://localhost:3000` (frontend) and `http://localhost:5000/api` (backend).

### Environment Variables

**`server/.env`**
```env
# App
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/vaultx

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# AWS
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=vaultx-objects

# SQS (optional)
AWS_SQS_QUEUE_URL=https://sqs.ap-south-1.amazonaws.com/xxxx/vaultx-jobs

# SSH Auth
SSH_HOST=0.0.0.0
SSH_PORT=2222
```

**`client/.env`**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## ☁️ AWS Deployment

### Infrastructure Overview

| Service | Purpose |
|---|---|
| **EC2 (t3.medium+)** | Backend API server |
| **S3** | Frontend static hosting + repo object storage |
| **CloudFront** | CDN for React SPA |
| **MongoDB Atlas** | Managed database (or self-hosted on EC2) |
| **SQS** | Async job queue for heavy operations |
| **CloudWatch** | Logs, metrics, and alerting |
| **IAM** | Fine-grained access roles |
| **Route 53** | DNS management |
| **ACM** | SSL/TLS certificates |

### Deployment Steps

```bash
# 1. SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# 2. Install Node.js, PM2, Nginx, and Docker
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2

# 3. Pull the repo and install
git clone https://github.com/yourusername/vaultx.git
cd vaultx/server && npm install --production

# 4. Start with PM2
pm2 start ecosystem.config.js
pm2 save && pm2 startup

# 5. Configure Nginx as reverse proxy
sudo cp deploy/nginx.conf /etc/nginx/sites-available/vaultx
sudo ln -s /etc/nginx/sites-available/vaultx /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 6. Deploy frontend to S3
cd client && npm run build
aws s3 sync build/ s3://your-frontend-bucket --delete
```

### CI/CD with GitHub Actions

A sample workflow is included at `.github/workflows/deploy.yml` that:
1. Runs tests on every push
2. Builds the React app
3. Syncs the build to S3 + invalidates CloudFront cache
4. SSHes into EC2 and restarts the backend via PM2

---

---

## 📡 API Reference

Base URL: `https://your-domain.com/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT |
| `GET` | `/users/:username` | Get public user profile |
| `POST` | `/repos` | Create a new repository |
| `GET` | `/repos/:owner/:repo` | Get repository details |
| `GET` | `/repos/:owner/:repo/commits` | List commits |
| `GET` | `/repos/:owner/:repo/branches` | List branches |
| `POST` | `/repos/:owner/:repo/pulls` | Open a pull request |
| `GET` | `/repos/:owner/:repo/tree/:ref` | Get file tree at ref |
| `GET` | `/repos/:owner/:repo/blob/:ref/*` | Get file content |

> Full API docs available at `/api/v1/docs` (Swagger UI) when running in development mode.

---

## 🗺️ Roadmap

- [x] User authentication (JWT + refresh tokens)
- [x] Repository CRUD
- [x] Commit & diff engine
- [x] Branch management
- [ ] Pull request workflows
- [ ] Inline code review comments
- [ ] Webhook system
- [ ] SSH push/pull support
- [ ] CI/CD pipeline integration hooks
- [ ] Organization & team management
- [ ] Repository mirroring
- [ ] GraphQL API (v2)

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using MongoDB · Express · React · Node.js · AWS</p>
