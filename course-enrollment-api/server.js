const express = require('express');
const cors = require('cors');
require('dotenv').config();

const logger = require('./middleware/logger');
const courseRoutes = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use('/course', courseRoutes);
app.use('/', courseRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Course Enrollment API is running '});
});

app.use((req, res)=> {
    res.status(404).json({error: 'Route not found.'});
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});