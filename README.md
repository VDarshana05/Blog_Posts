# Tech Blogs Website

A full-stack blog platform built with **FastAPI (backend)** and **React (frontend)**.  
Users can sign up, log in, create blog posts with images, and view them with pagination.  
Older posts are shown last, and each post has its own detailed view.



##  Features

- **User Authentication**
  - Signup with username, email, password (hashed with bcrypt)
  - Login and secure password verification

- **Blog Management**
  - Create blog posts with title, description, date, and image
  - Paginated landing page (6 posts per page)
  - Blog detail page for each post

- **Image Support**
  - Images can be stored as URLs or served via FastAPI static files

- **Pagination**
  - First 6 posts on the landing page
  - Remaining posts displayed on subsequent pages
  - Oldest posts shown last



##  Tech Stack

**Frontend**
- React

**Backend**
- FastAPI
- PostgreSQL (psycopg2)
- Passlib (bcrypt hashing)
- CORS Middleware

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tech-blogs.git
cd tech-blogs
