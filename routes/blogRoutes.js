const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require('multer');

// Set up multer for picture uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

// Route to display all blog posts
router.get("/", (req, res) => {
  // Get all posts
  db.all("SELECT * FROM posts ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      throw err;
    }
    const user = req.user;
    res.render("index", { user, posts: rows });
  });
});

router.get("/new", ensureAuthenticated, (req, res) => {
  const user = req.user;
  res.render("new", { user });
});


// Submit new post
router.post("/", ensureAuthenticated, upload.single('image'), (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? req.file.buffer : null;

  // Get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // Adjust the format as needed

  // adds the new blog post into the database
  db.run(
    "INSERT INTO posts (title, content, category, created_at, image) VALUES (?, ?, ?, ?, ?)",
    [title, content, category, formattedDate, image],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect("/blogs");
      }
    }
  );
});

// Route to remove post
router.post("/:id/remove", ensureAuthenticated, (req, res) => {
  const postId = req.params.id;
  db.run("DELETE FROM posts WHERE id = ?", [postId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/blogs");
    }
  });
});

// Route to assign category
router.post("/:id/category", ensureAuthenticated, (req, res) => {
  const postId = req.params.id;
  const newCategory = req.body.category;

  // Update the category
  db.run(
    "UPDATE posts SET category = ? WHERE id = ?",
    [newCategory, postId],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect("/blogs");
      }
    }
  );
});

  // route for logout does not work
router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
  }
  res.redirect("/login");
});

module.exports = router;
