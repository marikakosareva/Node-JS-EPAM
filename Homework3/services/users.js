const users = [];
const User = require('./../models/User');

function getUsers() {
    return User.findAll();
}

function getUserById(id) {
    return User.findByPk(id);
}

function createUser(user) {
    return User.create(user);
}

function updateUser(id, userData) {
    return User.update({...userData}, {
        where: {
            id: id,
        }
    });
}

function getAutoSuggestUsers(loginSubstring, limit) {
    return User.findAll()
    .then(users => users.filter(user => user.login.includes(loginSubstring) && !user.isDeleted).slice(0, limit))
}

function deleteUser(id) {
    return User.update({is_deleted: true}, {
        where: {
            id: id,
        }
    });
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    getAutoSuggestUsers,
    deleteUser,
    getUsers
};