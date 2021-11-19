const data = require('../data/user');
const crypt = require('../config/encrypt');

const createAccount = async (user) => {
    const password = await crypt.encrypt(user.password);
    return data.createAccount({password, ...user});
}

const updateUser = (user, id) => {
    return data.updateUser(user, id);
};

const passwordRecover = async (password, id) => {
    const cryptPassword = await crypt.encrypt(password);
    return data.passwordRecover(cryptPassword, id);
};

const deleteUser = (id) => {
    return data.deleteUser(id);
};

const getUser = async (id) => {
    const user = await data.getUser(id);
    return {name: user[0].name, email: user[0].email, id: user[0].user_id, age: user[0].age};
};

const login = async (email, password) => {
    const user = await data.getUserPasswordByEmail(email);
    if(user[0]) {
        const validPassword = password === user[0].password;
        //await crypt.compare(password, user[0].password);
        if(validPassword){
            return {name: user[0].name, email: user[0].email, id: user[0].user_id, age: user[0].age};
        }
        throw ({detail: 'Incorrect password', code: 400})
    }
    throw ({detail: 'User not found', code: 400})
}

module.exports = {
    createAccount,
    updateUser,
    passwordRecover,
    deleteUser,
    getUser,
    login
};