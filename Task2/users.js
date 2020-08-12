const users = [];

function getUsers() {
    return users;
}

function getUserById(id) {
    return users.find(user => user.id === id && !user.isDeleted);
}

function createUser(user) {
    users.push(user);
}

function updateUser(id, userData) {
    const user = users.find(user => user.id === id);
    if (user) {
        Object.keys(userData).forEach(key => {
            user[key] = userData[key];
        })
    }
    return user;
}

function getAutoSuggestUsers(loginSubstring, limit) {
    return suggestUsers = users.filter(user => user.login.includes(loginSubstring) && !user.isDeleted).slice(0, limit);
}

function deleteUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        user.isDeleted = true;
    }
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    getAutoSuggestUsers,
    deleteUser,
    getUsers
};