const router = require("express").Router();
const { User, Posts, Comments } = require("../models");
const withAuth = require("../utils/auth");

// GET all blogs for homepage
router.get("/", async (req, res) => {
  try {
    // this will retreive all the posts from the database (db)
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
    console.log(posts);

    // this will allow it to respond with template to render along with date retrieved
    res.render("feedpage", {
      posts,
      loggedIn: true
    });
  } catch (err) {
    console.log(err, "-----------------------");
    res.status(500).json(err);
  }
});

// router.get("/comments/:id", async (req, res) => {
//   try {
//     // this will retreive all the posts from the database (db)
//     const dbPostData = await Posts.findByPk({
//       where: {
//         id: req.params.id
//       },
//       attributes: ["id", "title", "post_text", "date_created", "user_id"],
//       include: [
//         {
//           model: Comments,
//           attributes: ["id", "comment", "date_created", "user_id", "post_id",],
//           include: {
//             model: User,
//             attributes: ["id", "username"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["id", "username"],
//         },
//       ],
//     });

//     // This will serialize the data retrieved

//     const posts = dbPostData.map((post) => post.get({ plain: true }));
//     console.log(posts);

//     // this will allow it to respond with template to render along with date retrieved
//     res.render("feedpagecomments", {
//       posts,
//       loggedIn: req.session.loggedIn,
//       id: req.session.id
//     });
//   } catch (err) {
//     console.log(err, "-----NOT WORKING-----");
//     res.status(500).json(err);
//   }
// });

// GET all blogs for homepage
router.get("/:id", async (req, res) => {
  try {
    const dbBlogsData = await Posts.findAll({
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

    const posts = dbBlogsData.map((blog) => blog.get({ plain: true }));
    // RENDER HOMEPAGE WITH BLOG POSTS
    res.render("feedpagecomments", {
      posts,
      loggedIn: true
    });
  } catch (err) {
    console.log(err, "NOT WORKING!");
    res.status(500).json(err);
  }
});

module.exports = router;
