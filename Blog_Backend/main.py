from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.context import CryptContext
import psycopg2
from typing import List

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB connection
conn = psycopg2.connect(
    host="localhost",
    database="techblogsdb",
    user="postgres",
    password="Darsana@3005"
)
cursor = conn.cursor()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserSignup(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class BlogPostIn(BaseModel):
    title: str
    description: str
    date: str
    image: str  

class BlogPostOut(BaseModel):
    id: int
    title: str
    description: str
    date: str
    image: str


@app.post("/signup")
def signup(user: UserSignup):
    cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = pwd_context.hash(user.password)
    cursor.execute(
        "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
        (user.username, user.email, hashed_pw)
    )
    conn.commit()
    return {"message": "User created successfully"}

@app.post("/signin")
def login(user: UserLogin):
    cursor.execute("SELECT password FROM users WHERE email = %s", (user.email,))
    record = cursor.fetchone()
    if not record:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    hashed_password = record[0]
    if not pwd_context.verify(user.password, hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}


@app.post("/posts")
def create_post(post: BlogPostIn):
    cursor.execute(
        "INSERT INTO blogposts (title, description, date, image) VALUES (%s, %s, %s, %s)",
        (post.title, post.description, post.date, post.image)
    )
    conn.commit()
    return {"message": "Post created successfully"}

@app.get("/posts", response_model=List[BlogPostOut])
def get_posts(page: int = Query(1, ge=1), limit: int = Query(6, ge=1)):
    offset = (page - 1) * limit
    cursor.execute(
        "SELECT id, title, description, date, image FROM blogposts ORDER BY id DESC LIMIT %s OFFSET %s",
        (limit, offset)
    )
    posts = cursor.fetchall()
    result = []
    for post in posts:
        result.append({
            "id": post[0],
            "title": post[1],
            "description": post[2],
            "date": post[3].strftime("%Y-%m-%d") if post[3] else None,
            "image": post[4],
        })
    return result


@app.get("/posts/{post_id}", response_model=BlogPostOut)
def get_post(post_id: int):
    cursor.execute("SELECT id, title, description, date, image FROM blogposts WHERE id = %s", (post_id,))
    post = cursor.fetchone()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {
        "id": post[0],
        "title": post[1],
        "description": post[2],
        "date": post[3].strftime("%Y-%m-%d") if post[3] else None,
        "image": post[4],
    }
