const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Function to read users from JSON file
function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, return default structure
        return { users: [] };
    }
}

// Function to write users to JSON file
function writeUsers(usersData) {
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
}

// GET endpoint to get all users (for testing)
app.get('/api/users', (req, res) => {
    try {
        const usersData = readUsers();
        res.json(usersData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read users' });
    }
});

// POST endpoint for user signup
app.post('/api/signup', (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Read existing users
        const usersData = readUsers();

        // Check if user already exists
        const existingUser = usersData.users.find(user => 
            user.email === email || user.username === username
        );

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user object
        const newUser = {
            id: Date.now().toString(), // Simple ID generation
            username,
            email,
            password, // In a real app, you should hash this password
            createdAt: new Date().toISOString()
        };

        // Add user to array
        usersData.users.push(newUser);

        // Write back to file
        writeUsers(usersData);

        // Return success response (without password)
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({
            message: 'User created successfully',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// POST endpoint for user login
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Read existing users
        const usersData = readUsers();

        // Find user
        const user = usersData.users.find(user => 
            user.email === email && user.password === password
        );

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user data (without password)
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            message: 'Login successful',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 