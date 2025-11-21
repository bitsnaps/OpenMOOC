from fastapi.testclient import TestClient
from main import app, Base, engine

client = TestClient(app)

# Reset DB for tests
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def test_register_and_create_course():
    # 1. Register
    reg_res = client.post("/register", json={"username": "testuser", "password": "password123"})
    assert reg_res.status_code == 200
    token = reg_res.json()["access_token"]

    # 2. Create Course (Protected)
    course_data = {"title": "Vue 3 Masterclass", "description": "Learn Vue 3"}
    create_res = client.post(
        "/courses", 
        json=course_data, 
        headers={"Authorization": f"Bearer {token}"}
    )
    assert create_res.status_code == 200
    assert create_res.json()["title"] == "Vue 3 Masterclass"

    # 3. Get Courses (Public)
    get_res = client.get("/courses")
    assert get_res.status_code == 200
    assert len(get_res.json()) == 1