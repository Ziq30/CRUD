import { v4 as uuidv4 } from 'uuid';

// Get all users
export const getUsers = (req, res) => {
  req.db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

// Create a new user
export const createUser = (req, res) => {
  const { username, email, password } = req.body;
  const user = { username, email, password };
  
  req.db.query("INSERT INTO users SET ?", user, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, ...user });
  });
};

// Get a specific user by ID
export const getUser = (req, res) => {
  const { id } = req.params;

  req.db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(results[0]);
  });
};

// Delete a user by ID
export const deleteUser = (req, res) => {
  const { id } = req.params;

  req.db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(`User with the id ${id} has been deleted.`);
  });
};

// Update a user by ID
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  req.db.query(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
    [username, email, password, id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(`User with the id ${id} has been updated.`);
    }
  );
};
