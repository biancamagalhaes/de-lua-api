const database = require('../config/postgresConnection');

const createAccount = (psychologist) => {
	return database.query(
        `insert into psychologist (email, password, name, crp, state, created_on) 
         values ('${psychologist.email}', '${psychologist.password}', '${psychologist.name}', '${psychologist.crp}', '${psychologist.state}', '${psychologist.createdAt}')
         returning *;`
    );
};

const updatePsychologist = (psychologist, id) => {
	return database.query(
        `update "psychologist"
         set "name" = '${psychologist.name}',
         last_login = '${psychologist.lastLogin}',
         where psychologist_id = ${id}
         returning *;`
    );
};

const passwordRecover = (password, id) => {
	return database.query(
        `update "psychologist"
         set "password" = '${password}'
         where psychologist_id = ${id};`
    );
};

const deletePsychologist = (id) => {
	return database.query(
        `delete from "psychologist"
         where psychologist_id = ${id};`
    );
};

const getPsychologist = async (id) => {
	const psychologist = await database.query(
        `select "name", crp, state, "email", psychologist_id, created_on, last_login
         from "psychologist"
         where psychologist_id = ${id};`
    );

    return {...psychologist[0]}
};

const getPsychologistByEmail = async (email) => {
	return database.query(
        `select "name", crp, state, "email", psychologist_id, created_on, last_login
         from "psychologist"
         where "email" = '${email}';`
    );
};

const getPsychologistPasswordByEmail = async (email) => {
	return database.query(
        `select "name", password, crp, state, "email", psychologist_id, created_on, last_login
         from "psychologist"
         where "email" = '${email}';`
    );
};

module.exports = {
    createAccount,
    updatePsychologist,
    passwordRecover,
    deletePsychologist,
    getPsychologist,
    getPsychologistByEmail,
    getPsychologistPasswordByEmail
};