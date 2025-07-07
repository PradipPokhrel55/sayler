# 🛒 E-Commerce Platform

A full-stack e-commerce web application built with **React** for the frontend and **Django** (Django REST Framework) for the backend. This platform supports product browsing, cart management, user authentication, and order processing.

---

## 🚀 Features

### 🖥️ Frontend (React)
- Product listing and detail views
- Shopping cart functionality
- User authentication (login/register)
- Checkout and order confirmation
- Responsive and modern UI (Tailwind CSS)

### 🔧 Backend (Django)
- RESTful API for products, users, and orders
- Token-based authentication (JWT)
- Admin dashboard for managing products and orders
- Secure user management

---

## 🧱 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React, React Router, Redux (optional) |
| Backend     | Django, Django REST Framework |
| Database    | SQLite                        |
| Auth        | JWT                           |
| Styling     | Tailwind CSS                  |

---

## 🛠️ Getting Started

### 🔙 Backend (Django)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-platform.git
   cd ecommerce-platform/backend
##

2. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
##

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
##

##
4. **Apply migrations**
   ```bash
   python manage.py migrate

##

5. **(optional)Create a superuser**
   ```bash
   python manage.py createsuperuser

##

6. **Run the server**

   ```bash
   python manage.py runserver
##

###🌐 Frontend (React)

##

7. **Navigate to the frontend directory**

   ```bash
   cd ../frontend
##

8. **Install dependencies**

   ```bash
   npm install
##

9. **Run the development server**

   ```bash
   npm start
