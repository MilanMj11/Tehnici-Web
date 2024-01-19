const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static('public'));

// console.log(__dirname);

// app.use(express.static(path.join(__dirname, 'C:/Users/Mujdar Milan/Desktop/Proiect Tehnici Web')));

// Set the correct MIME type for CSS files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
  });


let userData = [];


if (fs.existsSync('users.json')) {
  try {
    const data = fs.readFileSync('users.json', 'utf8');
    userData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading user data:', err);
  }
}

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = userData.find((user) => user.username === username);

  if (user && user.password === password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


app.post('/create-account', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const existingUser = userData.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = {
       username,
       password
    };

    userData.push(newUser);
    
    try {
      fs.writeFileSync('users.json', JSON.stringify(userData));
    } catch (err) {
      console.error('Error saving user data:', err);
      return res.status(500).json({ message: 'Error creating account' });
    }

    res.json({ message: 'Account created successfully!' });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.status(404).send('Error 404: Page not found');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});