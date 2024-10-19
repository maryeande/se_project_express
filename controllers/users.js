const User = require("../models/user");
const { err400, err404, err500 } = require("../utils/errors");

// GET / users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      res.status(err500.status).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(err400.status).send({ message: err.message });
      }
      return res.status(err500.status).send({ message: err500.message });
    });

  console.log(name, avatar);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(err404.status).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(err400.status).send({ message: err.message });
      }
      return res.status(err500.status).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
