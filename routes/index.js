const path = require("path");
const router = require("express").Router();
const userRouter = require("./User.js");
const gameRouter = require("./Game.js");

// API Routes
router.use("/User", userRouter);
router.use("/Game", gameRouter);

// If no API routes are hit, send the React app
router.use("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;