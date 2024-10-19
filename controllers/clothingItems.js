const ClothingItem = require("../models/clothingItem");
const { err400, err500 } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item }).catch;
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

module.exports = { createItem, getItems, updateItem, deleteItem };
module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};
