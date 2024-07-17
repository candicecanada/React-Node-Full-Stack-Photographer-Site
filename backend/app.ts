import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  findPostById,
  deletePostById,
  updatePostById
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  console.log("POST: /api/user/login");
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  console.log("POST: /api/user/validation");
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  console.log("GET: /api/posts");
  // Sleep delay goes here
  await sleep(1000);
  res.json(posts);
});


// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  console.log("GET: /api/posts/:id");
  const postId = req.params.id;
  // The line below should be fixed.
  const post = findPostById(postId);
  res.json(post);
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts/create", (req, res) => {
  console.log("POST: /api/posts/create");
  const newPost = req.body;
  addPost(newPost);
  res.status(200).json({ success: true });
});

app.post("/api/posts/:id/delete", (req, res) => {
  console.log("POST: /api/posts/:id/delete");
  const postId = req.body.id;
  deletePostById(postId);
  res.status(200).json({ success: true });
})

app.post("/api/posts/:id/update", (req, res) => {
  console.log("POST: /api/posts/:id/update");
  const post = req.body;
  updatePostById(post.id, post);

  res.status(200).json({ success: true });
})

app.listen(port, () => console.log("Server is running"));
