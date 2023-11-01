const User = require('../models/userModel');

const createUser = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(422).json({
            name: 'name is required',
            email: 'email is required'
        });
    }
    const user = new User(req.body);
    User.create(user, (err, user) => {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(user);
    });
};

const readUser = async (req, res) => {
    User.read(function (err, user) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(user);
    });
};

const readUserById = async (req, res) => {
    const id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(user);
    });
}


const updateUser = async (req, res) => {
    const id = req.params.id;
    User.update(id, new User(req.body), function (err, user) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(user);
    });
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    User.delete(id, function (err, user) {
        if (err) {
            return res.status(403).send(err);
        }
        res.json(user);
    });
};

module.exports = {
    createUser,
    readUser,
    readUserById,
    updateUser,
    deleteUser
};