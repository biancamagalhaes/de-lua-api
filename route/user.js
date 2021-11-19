const express = require('express');
const service = require('../service/user');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/', async function (req, res) {
    try{
        const body = req.body;
        if (!(body.email && body.password && body.name && body.cpf && body.age && body.createdAt)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const user = await service.createAccount(body);
        res.json({name: user[0].name, email: user[0].email, id: user[0].user_id, age: user[0].age});
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.get('/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const user = await service.getUser(id);
        res.json(user);
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.put('/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const body = req.body;
        if (!(body.name && body.psychologistId && body.lastLogin)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const user = await service.updateUser(body, id);
        res.json(user[0]);
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.put('/password/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const {password} = req.body;
        await service.passwordRecover(password, id);
        res.json({message: 'Successful updated password'});
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.delete('/:id', async function (req, res) {
    try{
        const id = req.params.id;
        await service.deleteUser(id);
        res.json({message: 'Successful user deleted'});
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.post('/login', async function (req, res) {
    try{
        const body = req.body;
        if (!(body.email && body.password)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const user = await service.login(body.email, body.password);
        if (user){
            res.json({message: 'Successful logged!', user: user});
        }
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
})

module.exports = app;