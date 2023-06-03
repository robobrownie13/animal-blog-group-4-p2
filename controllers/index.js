const router = require("express").Router();

const apiRoutes = require("./api");
const homeLandingRoutes = require("./home-landing-routes");
const feedRoutes = require("./home-routes");
const profileRoutes = require("./profile-routes");

router.use("/", homeLandingRoutes);
router.use("/api", apiRoutes);
router.use("/feed", feedRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
