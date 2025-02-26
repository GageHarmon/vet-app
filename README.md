# 🐾 Vet App

A web-based veterinary software to manage animal records, built with **Next.js** (frontend) and **FastAPI** (backend).

## 🚀 Features

✅ Add, edit, and delete animal records  
✅ FastAPI backend with SQLite database  
✅ Next.js frontend with Tailwind CSS  
✅ RESTful API with Swagger UI  
✅ Full CRUD functionality

---

## 🛠 Installation & Setup (Done in commandline or shell)

1️⃣ Clone the Repository

git clone https://github.com/YOUR_GITHUB_USERNAME/vet-app.git
cd vet-app

2️⃣ BACKEND SETUP (FastAPI + SQLite)

Navigate to the backend folder:
cd backend

Create a virtual environment:
python3 -m venv venv

Activate the virtual environment:
venv\Scripts\activate

Install dependencies:
pip install fastapi uvicorn sqlalchemy pydantic

Run the FastAPI server:
uvicorn main:app --reload
Test API in Swagger UI: Open: http://127.0.0.1:8000/docs

3️⃣ FRONTEND SETUP (Next.js + Tailwind CSS)

Navigate to the vet-app folder:
cd ../

Install Node.js dependencies:
npm install

Run the Next.js development server:
npm run dev
Open the web app in your browser: Visit http://localhost:3000 🚀

📌 API Endpoints
Method Endpoint Description
GET /animals/ Get all animals
POST /animals/ Add a new animal
PUT /animals/{id} Update an animal
DELETE /animals/{id} Delete an animal
