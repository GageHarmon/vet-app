from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from database import SessionLocal, Animal
from pydantic import BaseModel
import os
import shutil

app = FastAPI()

# ✅ CORS Middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ Allow Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # ✅ Allow all headers
)


# ✅ Serve images from the "images" folder
app.mount("/images", StaticFiles(directory="images"), name="images")

# ✅ Dependency to get database session


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Pydantic models for request validation


class AnimalCreate(BaseModel):
    name: str
    species: str
    age: int
    owner_name: str


class AnimalUpdate(BaseModel):
    name: str
    species: str
    age: int
    owner_name: str

# ✅ Root endpoint (Basic API test)


@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# ✅ Create a new animal


@app.post("/animals/")
def create_animal(animal: AnimalCreate, db: Session = Depends(get_db)):
    new_animal = Animal(
        name=animal.name,
        species=animal.species,
        age=animal.age,
        owner_name=animal.owner_name,
        photo=None  # Default to no image
    )
    db.add(new_animal)
    db.commit()
    db.refresh(new_animal)
    return new_animal

# ✅ Get all animals


@app.get("/animals/")
def get_animals(db: Session = Depends(get_db)):
    return db.query(Animal).all()

# ✅ Update an animal


@app.put("/animals/{animal_id}")
def update_animal(animal_id: int, updated_animal: AnimalUpdate, db: Session = Depends(get_db)):
    animal = db.query(Animal).filter(Animal.id == animal_id).first()
    if not animal:
        raise HTTPException(status_code=404, detail="Animal not found")

    animal.name = updated_animal.name
    animal.species = updated_animal.species
    animal.age = updated_animal.age
    animal.owner_name = updated_animal.owner_name

    db.commit()
    db.refresh(animal)
    return animal

# ✅ Delete an animal


@app.delete("/animals/{animal_id}")
def delete_animal(animal_id: int, db: Session = Depends(get_db)):
    animal = db.query(Animal).filter(Animal.id == animal_id).first()
    if not animal:
        raise HTTPException(status_code=404, detail="Animal not found")

    db.delete(animal)
    db.commit()
    return {"message": "Animal deleted successfully"}

# ✅ Upload an image for an animal


@app.post("/animals/{animal_id}/upload-photo/")
def upload_photo(animal_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    animal = db.query(Animal).filter(Animal.id == animal_id).first()
    if not animal:
        raise HTTPException(status_code=404, detail="Animal not found")

    file_extension = file.filename.split(".")[-1]
    file_name = f"{animal_id}.{file_extension}"
    file_path = f"images/{file_name}"

    # Ensure the images directory exists
    os.makedirs("images", exist_ok=True)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ✅ Store full URL instead of file path
    animal.photo = f"http://127.0.0.1:8000/images/{file_name}"
    db.commit()

    return {"message": "Photo uploaded successfully", "photo_url": animal.photo}
