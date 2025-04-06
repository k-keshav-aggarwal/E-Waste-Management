## **How Sessions Work (Session-based Authentication)**

### **1. User logs in:**
- You send username & password to the backend.
```js
POST /login  →  { email, password }
```

---

### **2. Server checks credentials:**
- If correct, server:
  - Creates a **unique session ID** (random string)
  - Stores that session ID **with user info** (like `userId`) in **server memory** or a **session store** (like Redis)
  - Sends that session ID back to the client as a **cookie**
```http
Set-Cookie: sessionId=abc123;
```

---

### **3. Browser saves the cookie:**
Now every future request **automatically includes** the session cookie:
```http
Cookie: sessionId=abc123
```

---

### **4. Server checks the cookie:**
- On each request, the server reads the session ID from the cookie
- Looks it up in memory or Redis:
```js
sessionStore["abc123"] → { userId: 42 }
```
- If found → request is authenticated

---

### **5. If session expires or is invalid:**
- Server denies access (401 Unauthorized)

---

## **Example:**

### On backend:
```js
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "a@b.com" && password === "123") {
    const sessionId = generateRandomId();
    sessionStore[sessionId] = { userId: 1 };
    res.cookie("sessionId", sessionId).send("Logged in");
  } else {
    res.status(401).send("Wrong credentials");
  }
});

app.get('/profile', (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessionStore[sessionId];
  if (session) {
    res.send("Welcome user " + session.userId);
  } else {
    res.status(401).send("Not logged in");
  }
});
```

---

## **In Summary:**

|                | **Sessions**                             | **JWT**                                |
|----------------|------------------------------------------|-----------------------------------------|
| Data stored in | Server (memory/db)                       | Token (client side)                     |
| Auth sent via  | Cookie (session ID)                      | Authorization header (Bearer token)     |
| Server checks  | Session ID in store                      | Signature with secret key               |
| Scaling        | Needs sticky sessions or Redis           | Easy scaling, stateless                 |

---

Want to try building a session-based login in Express just for fun?