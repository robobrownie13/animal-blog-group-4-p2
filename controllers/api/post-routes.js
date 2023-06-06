const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// this is going to create a new post
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

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log("This is the new post", newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// this is going to be able to edit a post

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Posts.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).json({ message: "This id has no post" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// this is going to be able to delete a post

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: { post_id: req.params.id },
    });

    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({
        message: `No user Id ${req.session.user_id} found with id = ${req.params.id}`,
      });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
