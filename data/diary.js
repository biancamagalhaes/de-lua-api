const database = require('../config/postgresConnection');

const newDiary = (diary) => {
	return database.query(
        `insert into diary(text, feeling, user_id, agreement, created_on) 
         values ('${diary.text}', '${diary.feeling}', '${diary.userID}', '${diary.agreement}', '${diary.createdOn}')
         returning *;`
    );
};

const deleteDiary = (id) => {
    database.query(
        `delete from diary
         where diary_id = ${id};`
    );
};

const getDiary = (id) => {
	return database.query(
        `select *
         from diary
         where diary_id = ${id};`
    );
};

const getComments = (id) => {
	return database.query(
        `select *
         from comments
         where diary_id = ${id}
         ORDER BY "created_on"::date;`
    );
};

const createComment = (comment) => {
	return database.query(
        `insert into comments(text, comment_type, diary_id, created_on) 
         values ('${comment.text}', '${comment.type}', '${comment.diaryID}', '${comment.createdOn}')
         returning *;`
    );
};

const getDiariesByUser = (id) => {
	return database.query(
        `select *
         from diary
         where user_id = ${id};`
    );
};


const updateDiary = (diary, id) => {
	return database.query(
        `update "diary"
         set psychologist_id = ${diary.psychologistID}
         where diary_id = ${id}
         returning *;`
    );
};

const getDiariesByPsychologist = async (id) => {
    const diaries = await database.query(
        `select *
         from diary
         where psychologist_id = ${id} or psychologist_id is null;`
    );

    return diaries;
}


module.exports = {
    newDiary,
    getDiary,
    getDiariesByUser,
    deleteDiary,
    updateDiary,
    getComments,
    createComment,
    getDiariesByPsychologist,
};