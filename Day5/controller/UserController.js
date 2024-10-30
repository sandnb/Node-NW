const UserModel = require("../model/UserModel");
const {createFactory,
    getAllFactory,
    getByIdFactory,
    deleteByIdFactory} = require("../utility/crudFactory");

const createUserHandler = createFactory(UserModel);
const getAllUsers = getAllFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const deleteUserById = deleteByIdFactory(UserModel);

module.exports = { createUserHandler,
                getAllUsers,
                getUserById,
                deleteUserById
}