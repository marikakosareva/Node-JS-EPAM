const Group = require('../models/Group');

function getGroups() {
    return Group.findAll();
}

function getGroupById(id) {
    return Group.findByPk(id);
}

function createGroup(group) {
    return Group.create(group);
}

function updateGroup(id, groupData) {
    return Group.update({...groupData}, {
        where: {
            id: id,
        }
    });
}

function deleteGroup(id) {
    return Group.destroy({
        where: {
          id
        }
      });
}

module.exports = {
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    getGroups
};