# Yash Kapadi — DevOps & Cloud Infrastructure Portfolio

An interactive, DevOps-focused developer portfolio built with **Next.js (App Router)** and **Framer Motion**. This project serves as an interactive showcase of technical skills, professional experience, and operational automation capabilities.

---

## 🚀 Key Highlights & Interactive Features

* **Interactive CLI Terminal**: A functional browser-based shell simulator parsing user commands (`about`, `skills`, `experience`, `contact`) with support for auto-complete (Tab) and command history navigation.
* **CI/CD Pipeline Simulator**: A real-time build, test, and containerized deployment simulation showing sequential Maven compilation, Pytest execution, Docker builds, and Terraform orchestration.
* **AWS Topology Telemetry Visualizer**: An interactive cloud infrastructure diagram mapping Route53, CloudFront, Application Load Balancers, ECS clusters, S3, and RDS layers with live hover-state metrics.
* **System Metrics Monitoring**: Live status tracking indicators mimicking CPU load, RAM allocation, and cluster uptime.

---

## 🛠 Tech Stack

* **Frontend Architecture**: Next.js (App Router), React, Framer Motion, Vanilla CSS
* **Cloud & Infrastructure (AWS)**: EC2, ECS, S3, CloudFront, Route53, Application Load Balancer, RDS
* **Infrastructure as Code (IaC)**: Terraform, Ansible
* **Automation & CI/CD**: Jenkins, n8n, Bash Scripting
* **Development Stack**: Python, Java, Spring Boot, ReactJS
* **Operating Systems**: Linux (Ubuntu, Alpine)

---

## ⚙️ Development Lifecycle

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm (v10.0.0 or higher)

### Setup & Local Development
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Production Build & Deployment
```bash
# Build the optimized production bundle
npm run build

# Start the production server locally
npm run start
```

---

## 📄 Repository Structure & Configuration

* **`components/Portfolio.jsx`**: Core UI, state machines for the CLI terminal and CI/CD simulation, and portfolio content.
* **`app/portfolio.css`**: Styling layer, neon color variables, and terminal styling.
* **`app/layout.jsx`** & **`app/page.jsx`**: Next.js App Router root layout and landing page configurations.
* **`public/`**: Directory for static assets and public file rendering.
