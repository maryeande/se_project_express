const ClothingItem = require("../models/clothingItem");
const { err400, err404, err500 } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(err400.status).send({ message: err.message });
      }
      return res.status(err500.status).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(err500.status).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) =>
      res
        .status(200)
        .send({ data: item })
        .catch((e) => {
          res
            .status(err500.status)
            .send({ message: "Error from updateItem", e });
        })
    );
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() =>
      res
        .status(204)
        .send({})
        .catch((e) => {
          res
            .status(err500.status)
            .send({ message: "Error from deleteItem", e });
        })
    );
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((like) => res.status(200).send(like))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else {
        res.status(err500.status).send({ message: err500.message });
      }
    });

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((dislike) => res.status(200).send(dislike))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err404.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err400.message });
      } else {
        res.status(err500.status).send({ message: err500.message });
      }
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
