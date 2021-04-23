const express = require('express');
const app = express();
const path = require('path')
const ConnectDB = require('./config/db')
// Connect DB
ConnectDB();

// Init middleware
app.use(express.json({ extended: false }))

// Routes

app.use('/api/users', require('./routes/api/Users'));
app.use('/api/auth', require('./routes/api/Auth'));
app.use('/api/profile', require('./routes/api/Profile'));
app.use('/api/posts', require('./routes/api/Posts'));

//Serve static assets in prod
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//Port 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
