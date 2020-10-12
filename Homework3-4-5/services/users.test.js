const {
    getUserById,
    createUser,
    updateUser,
    getAutoSuggestUsers,
    deleteUser,
    getUsers,
    addUsersToGroup
} = require('./users');
const db = require('../data-access/db');
const User = require('../models/User');
const UserToGroup = require('./../models/UserToGroup');

const user = {
    "id": "57fcf5cf-8ba9-4e41-ab82-6f557c3f3e6v",
    "login": "Sasha",
    "password": "12345qwerty",
    "age": 20,
    "is_deleted": false,
};

const users = [
    {
        "id": "57fcf5cf-8ba9-4e41-ab82-6f557c3f3e6a",
        "login": "Sasha",
        "password": "12345qwerty",
        "age": 21,
        "is_deleted": false,
    },
    {
        "id": "57fcf5cf-8ba9-4e41-ab82-6f557c3f3e6b",
        "login": "Masha",
        "password": "12345qwerty",
        "age": 22,
        "is_deleted": false,
    },
    {
        "id": "57fcf5cf-8ba9-4e41-ab82-6f557c3f3e6c",
        "login": "Masha2",
        "password": "12345qwerty",
        "age": 23,
        "is_deleted": false,
    },
    {
        "id": "57fcf5cf-8ba9-4e41-ab82-6f557c3f3e6c",
        "login": "Masha3",
        "password": "12345qwerty",
        "age": 23,
        "is_deleted": false,
    }
];

test('getUserById', () => {
    const findUserById = User.findByPk = jest.fn().mockReturnValue(user);
    expect(getUserById(user.id)).toBe(user);
    expect(findUserById).toHaveBeenLastCalledWith(user.id);
});

test('getUsers', () => {
    const findAllUsers = User.findAll = jest.fn().mockReturnValue(users);
    expect(getUsers()).toEqual(
        expect.arrayContaining(users),
      );
    expect(findAllUsers).toHaveBeenCalled();
});

test('getAutoSuggestUsers', async () => {
    const findAllUsers = User.findAll = jest.fn().mockReturnValue(Promise.resolve(users));
    const result = await getAutoSuggestUsers("Ma", 2);
    expect(result).toEqual(
        expect.arrayContaining([users[1], users[2]]),
      );
    expect(findAllUsers).toHaveBeenCalled();
});

test('createUser', () => {
    const postUser = User.create = jest.fn().mockReturnValue(user);
    expect(createUser(user)).toBe(user);
    expect(postUser).toHaveBeenLastCalledWith(user);
});

test('updateUser', () => {
    const patchUser = User.update = jest.fn().mockReturnValue(user);
    expect(updateUser(user.id, user)).toBe(user);
    expect(patchUser).toHaveBeenLastCalledWith(user, {
        where: {
            id: user.id,
        }
    });
});

test('deleteUser', () => {
    const updateUser = User.update = jest.fn().mockReturnValue(user);
    expect(deleteUser(user.id)).toBe(user);
    expect(updateUser).toHaveBeenLastCalledWith({is_deleted: true}, {
        where: {
            id: user.id,
        }
    });
});

test('addUsersToGroup', async () => {
    const body = {
        "user_ids": ["57fcf5cf-8ba9-4e41-ab82-6f557c3f3e6v", "044ef3bd-3f61-4c56-95db-e45aeebfecd6", "3a45f057-3b22-4b6c-9f40-1ede12bd9f9a"],
        "group_id": "f1801729-d015-4ffa-bae3-581dd4e851a4"
    };
    const dbTransaction = db.transaction = jest.fn().mockReturnValue({ commit: () => {}, rollback: () => {}});
    const userToGroup = UserToGroup.create = jest.fn().mockReturnValue(1);
    const result = await addUsersToGroup(body.group_id, body.user_ids);
    expect(dbTransaction).toHaveBeenCalled();
    expect(userToGroup).toHaveBeenCalled();
});