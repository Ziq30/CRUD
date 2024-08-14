import { v4 as uuidv4 } from 'uuid';

let users = [];

// Get all users
export const getUsers = (req, res) => {
  res.send(users);
};

// Create a new user
export const createUser = (req, res) => {
  const user = req.body;

  const userWithId = { ...user, id: uuidv4() };

  users.push(userWithId);

  res.send(`User with the name ${user.username} added to the database!`);
};

// Get a specific user by ID
export const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
};

// Delete a user by ID
export const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`User with the id ${id} deleted from the database.`);
};

// Update a user by ID
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const user = users.find((user) => user.id === id);

  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;

  res.send(`User with the id ${id} has been updated.`);
};
