const router = require('express').Router();
const { User, Posts, Comments } = require('../models');
const sequelize = require('../config/config');

// this will get all the posts

router.get('/', async (req, res) => {
    try {

        // this will retreive all the posts from the database (db)
        const dbPostData = await Posts.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
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
            order: [['created_at', 'DESC']],
        })

        // This will serialize the data retrieved
        
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts)

        // this will allow it to respond with template to render along with date retrieved
        res.render('homepage',
        { posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        userId: req.session.userId });
    } catch (err) {
        res.status(500).json(err);
    }
});

// this will get a single post

router.get('/post/:id', async (req, res) => {
    try{
        const dbPostData = await Posts.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'content', 'title', 'created_at'],
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
        });
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn, username: req.session.username, })
        } else {
            res.status(404).json({ message: "This id has no post!"});
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// this will allow the user to login

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// this will allow the user to signup

router.get('/signup', async (req, res) => {
    res.render('signup');
})

module.exports = router;