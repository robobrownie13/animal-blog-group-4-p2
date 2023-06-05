const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

// all the posts from the user

router.get("/", withAuth, (req, res) => {
  Posts.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "post_text", "date_created"],
    order: [["date_created", "DESC"]],
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
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("profile", {
        posts,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err, "!!!!!!HI!!!!!!");
      res.status(500).json(err);
    });
});

// this will have the ability to edit a post

router.put("/edit/:id", withAuth, (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_text", "date_created"],
    include: [
      {
        model: User,
        attributes: ["username", "id"],
      },
      {
        model: Comments,
        attributes: ["id", "comment", "post_id", "user_id", "date_created"],
        includes: {
          model: User,
          attributes: ["username", "id"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "This id has no post." });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", {
        post,
        loggedIn: true,
        usernanme: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err, "!!!!!!HI!!!!!!");
      res.status(500).json(err);
    });
});

// this will get a new post

router.post("/new", withAuth, (req, res) => {
  res.render("new-post", { username: req.session.username });
});

module.exports = router;
