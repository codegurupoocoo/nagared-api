const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Course API');
});

// In-memory course data
let courses = [];

// Create a course
app.post('/courses', (req, res) => {
    const { title, description, duration } = req.body;
    const newCourse = { id: courses.length + 1, title, description, duration };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// Retrieve all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// Update a course by ID
app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const { title, description, duration } = req.body;
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;

    res.json(course);
});

// Delete a course by ID
app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }

    courses.splice(courseIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
