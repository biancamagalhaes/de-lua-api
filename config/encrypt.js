const bcrypt = require("bcrypt");

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const compare = async (password, newPassword) => {
    return await bcrypt.compare(password, newPassword)
};

module.exports = {encrypt, compare};