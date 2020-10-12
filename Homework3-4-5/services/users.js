const createError = require('http-errors');
const db = require('../data-access/db');
const User = require('./../models/User');
const UserToGroup = require('./../models/UserToGroup');



async function addUsersToGroup(group_id, user_ids) {
    const transaction = await db.transaction();
    try {
    
        for (let i = 0; i<user_ids.length; i++) {
            await UserToGroup.create({
                user_id: user_ids[i],
                group_id: group_id
            }, {transaction});
        }   

        await transaction.commit();

    } catch (err) {
        await transaction.rollback();
        throw createError(404, 'Transaction went wrong!');
    }
}

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
    getUsers,
    addUsersToGroup
};