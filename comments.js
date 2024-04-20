// Create web server to handle comment request for comment using express router

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get a specific comment
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get all comments by a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const comments = await Comment.find({ userId: req.params.userId });
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        userId: req.body.userId,
        content: req.body.content,
        date: req.body.date
    });

    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update a comment
router.patch('/:commentId', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            { _id: req.params.commentId },
            { $set: { content: req.body.content } }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a comment
router.delete('/:commentId', async (req, res) => {
    try {
        const removedComment = await Comment.deleteOne({ _id: req.params.commentId });
        res.json(removedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;