import express from "express";
import pg from "pg";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "agriculture",
  password: "root",
  port: 5432,
});
db.connect();

app.use(express.static("assets"));
app.use(express.static("router"));
app.use(bodyParser.json()); // Middleware to parse JSON body in POST requests
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("/web dev/mine/self focused store/views/index.html");
});
app.get("/login", (req, res) => {
  res.sendFile("/web dev/mine/self focused store/views/login.html");
});

// Get all products from the database
app.get('/products', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM product ORDER BY price');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/wishlist', async (req, res) => {
  const userId = req.query; 
  try {
    const result = await db.query(
      'SELECT p.* FROM product p JOIN wishlist w ON p.id = w.product_id WHERE w.user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a product to the wishlist
app.post('/wishlist', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    
    const result = await db.query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING *',
      [userId, productId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a user's cart
app.get('/cart', async (req, res) => {
  const userId = req.query;  // Assuming userId is sent as a query parameter
  try {
    const result = await db.query(
      'SELECT p.*, c.quantity FROM product p JOIN carts c ON p.id = c.product_id WHERE c.user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const checkCart = await db.query(
      'SELECT * FROM carts WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    if (checkCart.rows.length > 0) {
      // If the product already exists, update the quantity
      const updateCart = await db.query(
        'UPDATE carts SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, userId, productId]
      );
      res.json(updateCart.rows[0]);
    } else {
      // If the product is not in the cart, add it
      const addToCart = await db.query(
        'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [userId, productId, quantity]
      );
      res.json(addToCart.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Registration (Sign Up)
app.post('/registerb', async (req, res) => {
  const { company_name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);  // Hash password
  try {
    const result = await db.query(
      'INSERT INTO buyer (company_name, email, password) VALUES ($1, $2, $3)',
      [company_name, email, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/registers', async (req, res) => {
  const { company_name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);  // Hash password
  try {
    const result = await db.query(
      'INSERT INTO seller (company_name, email, password) VALUES ($1, $2, $3)',
      [company_name, email, hashedPassword]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login (Sign In)
app.post('/loginb', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM buyer WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const validPassword = bcrypt.compareSync(password, user.password); // Compare passwords
      if (validPassword) {
        res.json({ message: 'Login successful', userId: user.id, username: user.username });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/logins', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM seller WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const validPassword = bcrypt.compareSync(password, user.password); // Compare passwords
      if (validPassword) {
        res.json({ message: 'Login successful', userId: user.id, username: user.username });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
