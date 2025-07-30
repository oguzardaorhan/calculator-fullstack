const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Route
const calculateRoute = require('./routes/calculate');
const getProcessesRoute = require('./routes/processes');
app.use('/api/calculate', calculateRoute);
app.use('/api/processes', getProcessesRoute);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
