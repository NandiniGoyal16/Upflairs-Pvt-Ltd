const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000,'localhost',()=>{
    console.log('server is running on port 3000')
})

let users = [
    { id: 1, name: 'Anil', email: 'anil@gmail.com', password: 'Hello@456' },
    { id: 2, name: 'Robin', email: 'robin@yahoo.com', password: 'Hello@789' },
    { id: 3, name: 'Ram', email: 'ram@gmail.com', password: 'Hello@545' },
    { id: 4, name: 'Dheeraj',email: 'dheeraj@gmail.com', password: 'Hello@890' },
    { id: 5, name: 'Esha', email: 'esha@yahoo.com', password: 'Hello@880' }
];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user by id
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    
    let updated = false;
    users = users.map(user => {
        if (user.id === id) {
            // user.name = name;
            // user.email = email;
            // user.password = password;
            updated = true;
            return{
                ...user, ...req.body
            }
        }
        return user;
    });

    if (updated) {
        res.json({ message: `User with id ${id} updated` });
    } else {
        res.status(404).json({ message: `User with id ${id} not found` });
    }
});

// Delete a user by id
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const initialLength = users.length;
    users = users.filter(user => user.id !== id);

    if (users.length < initialLength) {
        res.json({ message: `User with id ${id} deleted` });
    } else {
        res.status(404).json({ message: `User with id ${id} not found` });
    }
});
