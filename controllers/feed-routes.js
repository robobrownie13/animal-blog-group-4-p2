const router = require("express").Router();
const { User, Posts, Comments } = require("../models");

// GET all blogs for homepage
router.get("/", async (req, res) => {
  try {
    // this will retreive all the posts from the database (db)
    const dbPostData = await Posts.findAll({
      attributes: ["id", "title", "post_text", "date_created"],
      include: [
        {
          model: Comments,
          attributes: ["id", "comment", "post_id", "user_id", "date_created"],
          include: {
            model: User,
            attributes: ["username", "id"],
          },
        },
        {
          model: User,
          attributes: ["username", "id"],
        },
      ],
      order: [["date_created", "DESC"]],
    });

    // This will serialize the data retrieved

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // this will allow it to respond with template to render along with date retrieved
    res.render("feedpage", {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err, "-----------------------");
    res.status(500).json(err);
  }
});

// GET all blogs for homepage
router.get("/:id", async (req, res) => {
  try {
    const dbBlogsData = await Posts.findAll({
      attributes: ["id", "title", "post_text", "date_created", "user_id"],
      include: [
        {
          model: Comments,
          attributes: ["id", "comment", "date_created", "user_id", "post_id"],
          include: {
            model: User,
            attributes: ["username", "id"],
          },
        },
        {
          model: User,
          attributes: ["username", "id"],
        },
      ],
    });

    const blogs = dbBlogsData.map((blog) => blog.get({ plain: true }));
    // RENDER HOMEPAGE WITH BLOG POSTS
    res.render("feedpage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err, "!!!!!!HI!!!!!!");
    res.status(500).json(err);
  }
});

module.exports = router;
