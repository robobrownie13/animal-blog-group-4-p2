const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// this is going to signup the user

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.status(201).json({ message: `Account created for ${dbUserData.username }`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// this will login the user

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {username: req.body.username}
        });
        if (!dbUserData) {
            res.status(400).json({ message: `User id ${req.params.id} is not valid.` });
            return;
        }

        // this will check the password
        const pwValidated = await dbUserData.checkPassword(req.body.password)
        if (!pwValidated) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }

        // this is going to create a session and send the repsonse back

        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            // this will send a response back to the client 

            res.status(200).json({ message: "You are logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// this will logout the user

router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const dbUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

module.exports = router;