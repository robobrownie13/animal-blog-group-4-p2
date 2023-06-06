const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const sequelize = require("../config/connection");

// this will get all the posts

router.get("/", async (req, res) => {
  try {
    res.render("landingpage");
  } catch (err) {
    console.log(err, "-----------------------");
    res.status(500).json(err);
  }
});

// this will get a single post

router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Posts.findOne({
      where: { id: req.params.id },
      attributes: ["id", "post_text", "title", "date_created"],
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
    });
    if (dbPostData) {
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    } else {
      res.status(404).json({ message: "This id has no post!" });
      return;
    }
  } catch (err) {
    console.log(err, "!!!!!!HI!!!!!!");
    res.status(500).json(err);
  }
});

// this will allow the user to login

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// this will allow the user to signup

router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
