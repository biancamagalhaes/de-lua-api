const express = require('express');
const service = require('../service/diary');

const app = express();

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb' }));

app.post('/', async function (req, res) {
    try{
        const body = req.body;
        if (!(body.createdOn && body.text && body.feeling && body.userID && body.agreement)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const diary = await service.newDiary(body);
        res.json(diary[0]);
        res.end();
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.get('/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const diary = await service.getDiary(id);
        res.json(diary);
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.get('/diaries/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const diaries = await service.getDiariesByUser(id);
        res.json(diaries);
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.get('/diaries/psychologist/:id', async function (req, res) {
    try{
        const id = req.params.id;
        const diaries = await service.getDiariesByPsychologist(id);
        res.json(diaries);
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
        if (!(body.psychologistID)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const diary = await service.updateDiary(body, id);
        res.json(diary[0]);
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
        await service.deletediary(id);
        res.json({message: 'Successful diary deleted'});
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});

app.post('/comment', async function (req, res) {
    try{
        const body = req.body;
        if (!(body.createdOn && body.text && body.type && body.diaryID)) {
            throw({ detail: "Data not formatted properly", code: 'No code' });
        }
        const diary = await service.createComment(body);
        res.json(diary[0]);
        res.end();
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.detail, code: e.code})
        res.end();
    }
});



module.exports = app;