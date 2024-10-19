const router = require("express").Router();
const userRouter = require("./users");
const clothingItem = require("./clothingItems");
const { err500 } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);
router.use((req, res) => {
  res.status(err500.status).send({ message: "Router not found" });
});

module.exports = router;
