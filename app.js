const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const path = require("path");
const blogRoutes = require("./routes/blogRoutes");
const db = require("./database");

// Setting view engine to EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Fetch user from the database using id
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    done(err, user);
  });
});

// Login function
passport.use(
  new LocalStrategy((username, password, done) => {
    db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      }
    );
  })
);

// Redirect root to the login page
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/blogs");
  } else {
    res.redirect("/login");
  }
});

// Login route
app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/blogs");
  } else {
    res.render("login");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

app.use("/blogs", ensureAuthenticated, blogRoutes);

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "/public")));

// Using the blogRoutes for requests to /blogs
app.use("/blogs", blogRoutes);

db.run(
  "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
);

// Setting up the server to listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
