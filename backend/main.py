from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3


def create_database():

    connection = sqlite3.connect("tasks.db")

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            completed BOOLEAN NOT NULL
        )
    """)

    connection.commit()

    connection.close()


create_database()
def seed_tasks():

    connection = sqlite3.connect("tasks.db")

    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM tasks")

    count = cursor.fetchone()[0]

    if count == 0:

        cursor.executemany(
            "INSERT INTO tasks (id, title, completed) VALUES (?, ?, ?)",
            [
                (1, "Learn Java", False),
                (2, "Practice DSA", False),
                (3, "Build a Project", False)
            ]
        )

        connection.commit()

    connection.close()


seed_tasks()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/tasks")
def get_tasks():

    connection = sqlite3.connect("tasks.db")

    cursor = connection.cursor()

    cursor.execute("SELECT id, title, completed FROM tasks")

    rows = cursor.fetchall()

    connection.close()

    tasks = []

    for row in rows:

        task = {
            "id": row[0],
            "title": row[1],
            "completed": bool(row[2])
        }

        tasks.append(task)

    return tasks


@app.post("/tasks")
def add_task(task: dict):

    connection = sqlite3.connect("tasks.db")

    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO tasks (id, title, completed) VALUES (?, ?, ?)",
        (
            task["id"],
            task["title"],
            task["completed"]
        )
    )

    connection.commit()

    connection.close()

    return task


@app.put("/tasks/{task_id}")
def update_task(task_id: int, task_update: dict):

    connection = sqlite3.connect("tasks.db")

    cursor = connection.cursor()

    cursor.execute(
        "UPDATE tasks SET completed = ? WHERE id = ?",
        (
            task_update["completed"],
            task_id
        )
    )

    connection.commit()

    connection.close()

    return {
        "message": "Task updated"
    }
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    connection = sqlite3.connect("tasks.db")

    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM tasks WHERE id = ?",
        (task_id,)
    )

    connection.commit()

    connection.close()

    return {
        "message": "Task deleted"
    }