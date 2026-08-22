const express = require("express");
const database = require("better-sqlite3");

const app = express();
const PORT = 3000;

const db = new database("pcbuild.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        price REAL NOT NULL,
        old_price REAL,
        discount INTEGER,
        image TEXT,
        characteristics TEXT
    )
`).run();


app.use(express.json());
app.use(express.static('.'));

app.get('/api/test', (req, res) => {
    res.json({
        message: "Server works!"
    });
});

app.get('/api/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();

    res.json(products);
});

app.post('/api/products', (req, res) => {
    const{name, type, price, old_price, discount, image, characteristics} = req.body;

    const result = db.prepare(`
        INSERT INTO products
        (name, type, price, old_price, discount, image, characteristics)
        VALUES (?, ?, ?, ?, ?, ?, ?)   
    `).run(
        name,
        type,
        price,
        old_price,
        discount,
        image,
        characteristics
    );

    res.json({
        id: result.lastInsertRowid,
        message: "Product added"
    });
});

app.get('/api/add-test-product', (req, res) => {
    const result = db.prepare(`
        INSERT INTO products
        (name, type, price, old_price, discount, image, characteristics)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
        'PCBuild™ FrostWhite',
        'PREBUILT PC',
        1499,
        1699,
        15,
        'css/1stPC.jpg',
        'Ryzen 7 7700X / RTX 4070 / 32GB RAM / 1TB SSD'
    );

    res.json({
        id: result.lastInsertRowid,
        message: 'Test product added'
    });
});




app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});