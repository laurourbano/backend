const User = function (user) {
    this.name = user.name;
    this.email = user.email;
};

User.create = (newUser, result) => {
    connection.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {
            id: res.insertId,
            ...newUser
        });
    });
}

User.read = function (result) {
    connection.query('SELECT * FROM users', (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.findById = function (id, result) {
    connection.query('SELECT * FROM users WHERE id = ?', id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res[0]);
    });
}

User.update = function (id, user, result) {
    connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {
            id: id,
            ...user
        });
    });
}

User.delete = function (id, result) {
    connection.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = User;