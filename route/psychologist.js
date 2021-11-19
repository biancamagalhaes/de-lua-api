const express = require('express');
const service = require('../service/psychologist');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/', async function (req, res) {
    try{
        const body = req.body;
        if (!(body.email && body.password && body.name && body.crp && body.state && body.createdAt)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const psychologist = await service.createAccount(body);
        res.json(psychologist);
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
        const psychologist = await service.getPsychologist(id);
        res.json(psychologist);
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
        if (!(body.name && body.lastLogin)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const psychologist = await service.updatePsychologist(body, id);
        res.json(psychologist[0]);
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
        await service.deletePsychologist(id);
        res.json({message: 'Successful psychologist deleted'});
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
        const psychologist = await service.login(body.email, body.password);
        if (psychologist){
            res.json({message: 'Successful logged!', psychologist: psychologist});
        }
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
})

module.exports = app;