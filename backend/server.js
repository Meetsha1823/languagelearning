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
// Path to blogs.json file
const blogsFilePath = path.join(__dirname, 'blogs.json');

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

// Function to read blogs from JSON file
function readBlogs() {
    try {
        const data = fs.readFileSync(blogsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, return default structure
        return { blogs: [] };
    }
}

// Function to write blogs to JSON file
function writeBlogs(blogsData) {
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogsData, null, 2));
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

// Get purchased courses for a user
app.get('/api/my-courses', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    const usersData = readUsers();
    const user = usersData.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ purchasedCourses: user.purchasedCourses || [] });
});

// Purchase a course (add to user's purchasedCourses)
app.post('/api/purchase-course', (req, res) => {
    const { userId, courseName } = req.body;
    if (!userId || !courseName) {
        return res.status(400).json({ error: 'userId and courseName are required' });
    }
    const usersData = readUsers();
    const user = usersData.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (!user.purchasedCourses) user.purchasedCourses = [];
    if (!user.purchasedCourses.includes(courseName)) {
        user.purchasedCourses.push(courseName);
        writeUsers(usersData);
    }
    res.json({ purchasedCourses: user.purchasedCourses });
});

// Get user progress
app.get('/api/progress', (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    const usersData = readUsers();
    const user = usersData.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ progress: user.progress || {} });
});

// Update user progress for a lesson
app.post('/api/progress', (req, res) => {
    const { userId, language, lessonId, completed } = req.body;
    if (!userId || !language || !lessonId) {
        return res.status(400).json({ error: 'userId, language, and lessonId are required' });
    }
    const usersData = readUsers();
    const user = usersData.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (!user.progress) user.progress = {};
    if (!user.progress[language]) user.progress[language] = {};
    user.progress[language][lessonId] = completed;
    writeUsers(usersData);
    res.json({ progress: user.progress });
});

// GET endpoint to get all blogs
app.get('/api/blogs', (req, res) => {
    try {
        const blogsData = readBlogs();
        res.json(blogsData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read blogs' });
    }
});

// POST endpoint to create a new blog
app.post('/api/blogs', (req, res) => {
    try {
        const { title, summary, content, category, author, authorId, imagePreview } = req.body;

        // Basic validation
        if (!title || !summary || !content || !author || !authorId) {
            return res.status(400).json({ error: 'All required fields are missing' });
        }

        // Read existing blogs
        const blogsData = readBlogs();

        // Create new blog object
        const newBlog = {
            id: Date.now().toString(),
            title,
            summary,
            content,
            category: category || 'Tips',
            author,
            authorId,
            imagePreview,
            createdAt: new Date().toISOString()
        };

        // Add blog to array
        blogsData.blogs.push(newBlog);

        // Write back to file
        writeBlogs(blogsData);

        // Return success response
        res.status(201).json(newBlog);

    } catch (error) {
        console.error('Blog creation error:', error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
});

// DELETE endpoint to delete a blog
app.delete('/api/blogs/:id', (req, res) => {
    try {
        const { id } = req.params;
        const blogsData = readBlogs();
        
        const blogIndex = blogsData.blogs.findIndex(blog => blog.id === id);
        
        if (blogIndex === -1) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Remove blog from array
        blogsData.blogs.splice(blogIndex, 1);

        // Write back to file
        writeBlogs(blogsData);

        res.json({ message: 'Blog deleted successfully' });

    } catch (error) {
        console.error('Blog deletion error:', error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 