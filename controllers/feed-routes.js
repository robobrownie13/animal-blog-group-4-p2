const router = require("express").Router();
const { User, Posts, Comments } = require("../models");

// GET all blogs for homepage
router.get('/', async (req, res) => {
    try {
      const dbBlogsData = await Posts.findAll({
        attributes: ["id", "title", "body", 'date_created', "user_id"],
        include: [
          {
            model: Comments,
            attributes: ["id", "comment", 'date_created', "user_id", "blog_id"],
            include: {
              model: User,
              attributes: ["username"]
            }
          },
          {
            model: User,
            attributes: ["username"]
        }
        ],
      });
  
      const blogs = dbBlogsData.map((blog) =>
        blog.get({ plain: true })
      );
      // RENDER HOMEPAGE WITH BLOG POSTS 
      res.render('feedpage', {
        blogs,
        loggedIn: req.session.loggedIn
      });
      
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// GET all blogs for homepage
router.get('/:id', async (req, res) => {
    try {
      const dbBlogsData = await Posts.findAll({
        attributes: ["id", "title", "body", 'date_created', "user_id"],
        include: [
          {
            model: Comments,
            attributes: ["id", "comment", 'date_created', "user_id", "blog_id"],
            include: {
              model: User,
              attributes: ["username"]
            }
          },
          {
            model: User,
            attributes: ["username"]
        }
        ],
      });
  
      const blogs = dbBlogsData.map((blog) =>
        blog.get({ plain: true })
      );
      // RENDER HOMEPAGE WITH BLOG POSTS 
      res.render('homepage', {
        blogs,
        loggedIn: req.session.loggedIn
      });
      
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });