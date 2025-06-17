# 📝 To-Do List App – Frontend Coding Assessment

This is a full-stack CRUD To-Do List App built with **Next.js (App Router)**. It demonstrates creating and managing tasks with API routes handled as middleware-style functions via `app/api`.

---

## ✅ Your Tasks

- [ ] Add new tasks via an input field
- [ ] Display a list of tasks
- [ ] Mark tasks as complete/incomplete
- [ ] Edit task titles
- [ ] Delete tasks

---

### 🔧 Install dependencies

```bash
npm install
```

### 🚀 Start dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 API Endpoints

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| GET    | `/api/todos` | Fetch all todos        |
| POST   | `/api/todos` | Create a new todo      |
| PUT    | `/api/todos` | Update title/completed |
| DELETE | `/api/todos` | Delete a todo          |

### ✅ Example Payloads

**POST**

```json
{ "title": "Write documentation" }
```

**PUT**

```json
{ "id": 123, "title": "Edit task title" }
```

**PUT (Toggle)**

```json
{ "id": 123, "title": "Edit documentation", "completed": true }
```

**DELETE**

```json
{ "id": 123 }
```

---

## 🧑‍💻 Submission

Please submit:

- GitHub repository link
- Short summary of what features were completed and what could be improved
