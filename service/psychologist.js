const data = require('../data/psychologist');
const crypt = require('../config/encrypt');

const createAccount = async (psychologist) => {
    const password = await crypt.encrypt(psychologist.password);
    const psychologistReturned = await data.createAccount({password, ...psychologist});
    return {name: psychologistReturned[0].name, email: psychologistReturned[0].email, id: psychologistReturned[0].psychologist_id};
};

const updatePsychologist = (psychologist, id) => {
    return data.updatePsychologist(psychologist, id);
};

const passwordRecover = async (password, id) => {
    const cryptPassword = await crypt.encrypt(password);
    return data.passwordRecover(cryptPassword, id);
};

const deletePsychologist = (id) => {
    return data.deletePsychologist(id);
};

const getPsychologist = (id) => {
    return data.getPsychologist(id);
};

const login = async (email, password) => {
    const psychologist = await data.getPsychologistPasswordByEmail(email);
    if(psychologist[0]) {
        const validPassword = password === psychologist[0].password;
        //await crypt.compare(password, psychologist[0].password);
        if(validPassword){
            return {name: psychologist[0].name, email: psychologist[0].email, id: psychologist[0].psychologist_id};
        }
        throw ({detail: 'Incorrect password', code: 400})
    }
    throw ({detail: 'psychologist not found', code: 400})
}

module.exports = {
    createAccount,
    updatePsychologist,
    passwordRecover,
    deletePsychologist,
    getPsychologist,
    login
};