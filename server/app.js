import express from 'express'
import path from 'path'

const app = express();

app.use('/public', express.static(path.join('.', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('.', 'index.html'))
});

app.get('/availability', (req, res) => {
    res.sendFile(path.resolve('.', 'index.html'))
})

app.get('/alive', (req, res) => {
    res.status(200).json({status:"ok"});
});

export default app;