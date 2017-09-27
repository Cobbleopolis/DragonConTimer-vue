import express from 'express'
import path from 'path'

const app = express();

app.use('/public', express.static(path.join('.', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('.', 'index.html'))
});

export default app;