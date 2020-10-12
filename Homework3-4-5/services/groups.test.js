const {
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    getGroups
} = require('./groups');
const Group = require('../models/Group');

const group = {
    "id": "ad862d61-6250-44d3-8a63-990a972bba98",
    "name": "testgroup"
};

const groups = [
    {
        "id": "ad862d61-6250-44d3-8a63-990a972bba9a",
        "name": "testgroup1"
    },
    {
        "id": "ad862d61-6250-44d3-8a63-990a972bba9b",
        "name": "testgroup2"
    },
    {
        "id": "ad862d61-6250-44d3-8a63-990a972bba9c",
        "name": "testgroup3"
    }
];

test('getGroupById', () => {
    const findGroupById = Group.findByPk = jest.fn().mockReturnValue(group);
    expect(getGroupById(group.id)).toBe(group);
    expect(findGroupById).toHaveBeenLastCalledWith(group.id);
});

test('getGroups', () => {
    const findAllGroups = Group.findAll = jest.fn().mockReturnValue(groups);
    expect(getGroups()).toEqual(
        expect.arrayContaining(groups),
      );
    expect(findAllGroups).toHaveBeenCalled();
});

test('createGroup', () => {
    const postGroup = Group.create = jest.fn().mockReturnValue(group);
    expect(createGroup(group)).toBe(group);
    expect(postGroup).toHaveBeenLastCalledWith(group);
});

test('updateGroup', () => {
    const patchGroup = Group.update = jest.fn().mockReturnValue(group);
    expect(updateGroup(group.id, group)).toBe(group);
    expect(patchGroup).toHaveBeenLastCalledWith(group, {
        where: {
            id: group.id,
        }
    });
});

test('deleteGroup', () => {
    const destroyGroup = Group.destroy = jest.fn().mockReturnValue(1);
    expect(deleteGroup(group.id)).toBe(1);
    expect(destroyGroup).toHaveBeenLastCalledWith({
        where: {
            id: group.id,
        }
    });
});