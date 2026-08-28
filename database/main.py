import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins={"*"},
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/update")
def add(name:str, type:str, category:str, amount:int, price:int):
    connect = sqlite3.connect("inventory.db")
    cursor = connect.cursor()

    cursor.execute(f"""
    INSERT INTO items (
    name,
    type,
    category,
    amount,
    price
    ) VALUES (?,?,?,?,?)
    """, (name, type, category, amount, price))

    connect.commit()
    connect.close()


@app.get("/read")
def main():
    connect = sqlite3.connect("inventory.db")
    cursor = connect.cursor()

    cursor.execute("SELECT id, name, type, amount, category , price FROM items")

    data = cursor.fetchall()

    return data


