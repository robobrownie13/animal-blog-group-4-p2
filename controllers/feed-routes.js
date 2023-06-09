const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");

// GET all blogs for homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      attributes: ["id", "title", "post_text", "date_created", "user_id"],
      order: [["date_created", "DESC"]],
      include: [
        {
          model: Comments,
          attributes: ["id", "comment", "post_id", "user_id", "date_created"],
          include: {
            model: User,
            attributes: ["id", "username"],
          },
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    // This will serialize the data retrieved

    const posts = dbPostData.map((post) => post.get({ plain: true }));
   
    // this will allow it to respond with template to render along with date retrieved
    res.render("feedpage", {
      posts,
      loggedIn: true
    });
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbBlogsData = await Posts.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "post_text", "date_created", "user_id"],
      include: [
        {
          model: Comments,
          attributes: ["id", "comment", "date_created", "user_id", "post_id"],
          include: {
            model: User,
            attributes: ["id", "username"],
          },
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    const post = dbBlogsData.get({ plain: true });

    res.render("feedpagecomments", {
      post,
      loggedIn: true
    });
  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;
