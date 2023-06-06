const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");

// all the posts from the user

router.get("/user", (req, res) => {
  Posts.findAll({
    where: {
      id: req.session.id,
    },
    attributes: ["id", "title", "post_text", "date_created", "user_id"],
    order: [["date_created", "DESC"]],
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
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("profileuser", {
        posts,
        loggedIn: true
      });
    })
    .catch((err) => {
      console.log(err, "There's a problem!");
      res.status(500).json(err);
    });
});

// router.get("/user", withAuth, async (req, res) => {
//   try {
//     const dbUserData = await User.findAll({
//       attributes: { exclude: ["password"] },
//       where: {
//         id: req.session.id,
//       },
//       include: [
//         {
//           model: Posts,
//           attributes: ["id", "title", "post_text", "date_created", "user_id"],
//         },
//         {
//           model: Comments,
//           attributes: ["id", "comment", "date_created", "user_id", "post_id"],
//         },
//       ],
//     });

//     const user = dbUserData.map((post) => post.get({ plain: true }));
//     res.render("profileuser", {
//       user,
//       loggedIn: true,
//       id: req.session.id,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Posts,
          attributes: ["id", "title", "post_text", "date_created", "user_id"],
        },
        {
          model: Comments,
          attributes: ["id", "comment", "date_created", "user_id", "post_id"],
        },
      ],
    });

    const users = dbUserData.map((post) => post.get({ plain: true }));
    res.render("profile", {
      users,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/new", (req, res) => {
  res.render("profilenewpost", { loggedIn: true });
});

router.get("/post/edit/:id", withAuth, (req, res) => {
  res.render("profile-update", { loggedIn: true });
});

// router.get("/:id", (req, res) => {
//   Posts.findAll({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "post_text", "date_created", "user_id"],
//     order: [["date_created", "DESC"]],
//     include: [
//       {
//         model: Comments,
//         attributes: ["id", "comment", "date_created", "user_id", "post_id"],
//         include: {
//           model: User,
//           attributes: ["id", "username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["id", "username"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       const posts = dbPostData.map((post) => post.get({ plain: true }));
//       res.render("profile", {
//         posts,
//         loggedIn: true
//       });
//     })
//     .catch((err) => {
//       console.log(err, "There's a problem!");
//       res.status(500).json(err);
//     });
// });

// this will have the ability to edit a post

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
      console.log(err, "!!!!!!HI!!!!!!");
      res.status(500).json(err);
    });
});

// this will get a new post

module.exports = router;
