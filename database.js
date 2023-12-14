// Inside your database.js or your database setup file
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database');
        
        // Create the posts table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                content TEXT,
                category TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                image BLOB
            )
        `);
        
        // Create the users table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                password TEXT
            )
        `);

        // Add a sample user for testing
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", ["Yvonne", "1234"], (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
});

module.exports = db;
