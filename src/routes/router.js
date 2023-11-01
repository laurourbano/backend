const express = require('express');
const router = express.Router();
const { createUser,
    readUser,
    readUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.post('/users', createUser);
router.get('/users', readUser);
router.get('/users/:id', readUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;