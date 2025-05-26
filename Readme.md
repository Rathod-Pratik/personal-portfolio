
# Personal Portfolio – Pratik Rathod

Live Site: [https://pratikofficial.vercel.app/](https://pratikofficial.vercel.app/)

## Overview

This is a full-stack personal portfolio web application to showcase projects, skills, code snippets, and more. The site is built with a modern React frontend (Vite, TailwindCSS) and a Node.js/Express/MongoDB backend. It features a dynamic admin dashboard for content management, project CRUD, and code sharing.

---

## Features

- **Home Page:** Introduction, animated hero section, and quick links.
- **About:** Personal background, education, and experience.
- **Projects:** Interactive project gallery with details, tech stack, features, live demo, and GitHub links.
- **Code Snippets:** Share and browse code in various languages (HTML, CSS, JS, C++, Java, PHP, SQL, etc.).
- **Notes:** Share and manage programming notes.
- **Admin Panel:** Secure login, add/edit/delete projects, upload images, manage code/notes.
- **Contact Form:** Send messages directly from the site.
- **Responsive Design:** Mobile-friendly and visually appealing.
- **Authentication:** Admin-only access for content management.

---

## Tech Stack

### Frontend

- React 18 (with Vite)
- TailwindCSS
- Zustand (state management)
- React Router DOM
- React Icons, Swiper, AOS (animations)
- Axios (API calls)
- React Toastify (notifications)

### Backend

- Node.js, Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file uploads)
- AWS S3 (image storage)
- Nodemailer (contact form)
- Helmet, CORS, dotenv

---

## Project Structure

```
personal-portfolio/
│
├── app/                # Frontend (React)
│   ├── src/
│   ├── public/
│   └── ...
│
├── Server/             # Backend (Node.js/Express)
│   ├── Controller/
│   ├── Model/
│   ├── Routes/
│   └── ...
│
├── Readme.md
└── ...
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- AWS S3 bucket (for image uploads)
- Vercel/Netlify (for deployment, optional)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies:**
   - Frontend:
     ```sh
     cd app
     npm install
     ```
   - Backend:
     ```sh
     cd ../Server
     npm install
     ```

3. **Environment Variables:**
   - Create `.env` files in both `app/` and `Server/` as needed.
   - Backend `.env` example:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     AWS_ACCESS_KEY_ID=your_aws_key
     AWS_SECRET_ACCESS_KEY=your_aws_secret
     S3_BUCKET_NAME=your_bucket
     EMAIL_USER=your_email
     EMAIL_PASS=your_email_password
     ```

4. **Run the app:**
   - Backend:
     ```sh
     cd Server
     npm run dev
     ```
   - Frontend:
     ```sh
     cd ../app
     npm run dev
     ```

5. **Access the site:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000) (default)

---

## Usage

- Browse projects, code, and notes.
- Admins can log in to manage content.
- Contact form sends emails directly to the owner.

---

## Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---
