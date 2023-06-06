const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");

// CREATE ALL USERS
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"]},
      include: [
        {
          model: Posts,
          attributes: ['id', 'title', 'post_text', 'date_created', 'user_id']
        },
        {
          model: Comments,
          attributes: ['id', 'comment', 'date_created', 'user_id', 'post_id']
        }
      ]
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ONE USER
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ["password"]},
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Posts,
          attributes: ['id', 'title', 'post_text', 'date_created', 'user_id']
        },
        {
          model: Comments,
          attributes: ['id', 'comment', 'date_created', 'user_id', 'post_id']
        }
      ]
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({ 
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
console.log(req.session);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
