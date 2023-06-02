const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// this will get the comments from 'api/comment'
router.get('/', async (req, res) => {
    try{
        const dbCommentData = await Comment.findAll({});
        if (dbCommentData.length === 0) {
            res.status(404).json({ message: "No comment found!"});
            return;
        };
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// this is going to get all comments from one post
router.get('/id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { id: req.params.id },
        });
        if (commentData.length === 0) {
            res.status(404).json({ message: `The id ${req.params.id} has no comment! `});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// this will create a comment 
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newComment = await Comment.create({
            ...body,
            userId: req.session.userId,
        });
        res.status(200).json({ newComment, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// this is going to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comment.destroy({
            where: {id: req.params.id},
        });
        if (!dbCommentData) {
            res.status(404).json({
                message: `No comment is found with id = ${req.params.id}`,
            });
            return;
        }
        res.status(200).json({dbCommentData, success: true});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;