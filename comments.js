// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create an instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a list of comments
const commentsByPostId = {};

// Create a route handler
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a route handler
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    // req.body is the data that is sent along with the request
    const { content } = req.body;

    // Check if commentsByPostId has a list of comments for the post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment to the list
    comments.push({ id: commentId, content });

    // Add the comments to the commentsByPostId list
    commentsByPostId[req.params.id] = comments;

    // Send back the comment that was created
    res.status(201).send(comments);
});

// Listen for incoming requests
app.listen(4001, () => {
    console.log('Listening on 4001');
});