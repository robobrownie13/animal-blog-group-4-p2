const router = require('express').Router();
const { User, Posts, Animal, Comments  } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/config');

// all the posts from the user

router.get('/', withAuth, (req, res) => {
    Posts.findAll({
        where: {
            userId: req.session.userId,
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comments,
                attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true, username: req.session.username,});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// this will have the ability to edit a post

router.get('/edit/:id', withAuth, (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comments,
                attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
                includes: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: 'This id has no post.' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true, usernanme: req.session.username });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// this will get a new post

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { username: req.session.username });
});

module.exports = router;