# Yash Kapadi — Portfolio

A modern, animated developer portfolio built with **Next.js**, **React**, and **Framer Motion**.

The portfolio showcases my experience across software development, DevOps, cloud infrastructure, automation, and modern web technologies.

## 🚀 Tech Stack

* Next.js
* React.js
* Framer Motion
* JavaScript
* CSS
* Responsive Design

## 🛠️ Run Locally

Clone the repository and install the dependencies:

```bash
git clone <your-repository-url>
cd portfolio-nextjs
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 📸 Add Your Profile Photo

1. Add your image to:

```text
public/profile.jpg
```

2. Open:

```text
components/Portfolio.jsx
```

3. Find the `PROFILE PHOTO SLOT` comment and replace:

```jsx
<div className="avatar">YK</div>
```

with:

```jsx
<div className="avatar">
  <img src="/profile.jpg" alt="Yash Kapadi" />
</div>
```

## ✨ Features

* Animated terminal-style introduction
* Typing animation for commands such as `whoami` and `cat role.txt`
* Animated hero section with staggered transitions
* Profile photo section
* Experience timeline
* Technology and skills showcase
* Animated cards using Framer Motion
* Scroll-based reveal animations
* Hover animations and interactive UI elements
* Education and contact sections
* Responsive design for desktop and mobile devices

## 🌐 Deployment

The easiest way to deploy this Next.js portfolio is using Vercel.

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Keep the default settings.
4. Click **Deploy**.

You can also run the production build locally:

```bash
npm run build
npm run start
```

The application can also be deployed to any Node.js-compatible hosting platform.

## 📁 Project Structure

```text
portfolio-nextjs/
├── app/
├── components/
│   └── Portfolio.jsx
├── public/
│   └── profile.jpg
├── package.json
└── README.md
```

## 👨‍💻 About Me

I am a software developer and DevOps engineer with experience in:

* React.js
* Java Spring Boot
* Node.js
* Python
* MySQL
* PostgreSQL
* Docker
* Jenkins
* AWS
* Terraform
* CI/CD
* Linux
* Cloud Infrastructure

I enjoy building scalable applications, automating infrastructure, and learning modern cloud and DevOps technologies.

## 📬 Contact

Feel free to connect with me for collaboration, opportunities, or interesting technical discussions.

---

Built with ❤️ using Next.js and Framer Motion.
