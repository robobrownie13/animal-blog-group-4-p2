const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

router.get("/user", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      },
      include: [
        {
          model: Posts,
          attributes: ["id", "title", "post_text", "date_created", "user_id"],
          include: [
            {
              model: Comments,
              attributes: [
                "id",
                "comment",
                "date_created",
                "user_id",
                "post_id",
              ],
            },
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        },

      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render("profileuser", {
      user,
      loggedIn: true,
    });
  } catch (err) {
  
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Posts,
          attributes: ["id", "title", "post_text", "date_created", "user_id"],
          include: [
            {
              model: Comments,
              attributes: [
                "id",
                "comment",
                "date_created",
                "user_id",
                "post_id",
              ],
            },
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        },
      ],
    });

    const user = dbUserData.get({ plain: true });
    res.render("profile", {
      user,
      loggedIn: true,
    });
  } catch (err) {

    res.status(500).json(err);
  }
});
//allows user to go to new post page
router.get("/post/new", withAuth, (req, res) => {
  res.render("profilenewpost", { loggedIn: true });
});

//allows user to go to post editor
router.get("/post/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    const post = dbPostData.get({ plain: true });
    res.render("profile-update", { post, loggedIn: true });
  } catch (err) {

    res.status(500).json(err);
  }
});
//changes post by id
router.put("/edit/:id", withAuth, (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "post_text", "date_created", "user_id"],
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Comments,
        attributes: ["id", "comment", "date_created", "user_id", "post_id"],
        includes: {
          model: User,
          attributes: ["id", "username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "This id has no post." });
        return;
      }
      const user = dbPostData.get({ plain: true });
      res.render("profile-update", {
        user,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});


module.exports = router;
