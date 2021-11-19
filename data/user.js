const database = require('../config/postgresConnection');

const createAccount = (user) => {
	return database.query(
        `insert into "user"(email, password, name, cpf, age, created_on) 
         values ('${user.email}', '${user.password}', '${user.name}', '${user.cpf}', '${user.age}', '${user.createdAt}')
         returning *;`
    );
};

const updateUser = (user, id) => {
	return database.query(
        `update "user"
         set "name" = '${user.name}',
         psychologist_id = '${user.psychologistId}',
         last_login = '${user.lastLogin}',
         where user_id = ${id}
         returning *;`
    );
};

const passwordRecover = (password, id) => {
	return database.query(
        `update "user"
         set "password" = '${password}'
         where user_id = ${id};`
    );
};

const deleteUser = (id) => {
	return database.query(
        `delete from "user"
         where user_id = ${id};`
    );
};

const getUser = async (id) => {
	const user = await database.query(
        `select "name", cpf, "email", psychologist_id, user_id, created_on, last_login, age
         from "user"
         where user_id = ${id};`
    );

    return user;
};

const getUserByEmail = async (email) => {
	return database.query(
        `select "name", cpf, "email", psychologist_id, user_id, created_on, last_login
         from "user"
         where "email" = '${email}';`
    );
};

const getUserPasswordByEmail = async (email) => {
	return database.query(
        `select password, "name", cpf, "email", psychologist_id, user_id, created_on, last_login, age
         from "user"
         where "email" = '${email}';`
    );
};
module.exports = {
    createAccount,
    updateUser,
    passwordRecover,
    deleteUser,
    getUser,
    getUserByEmail,
    getUserPasswordByEmail
};