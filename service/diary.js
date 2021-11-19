const data = require('../data/diary');
const formatDate = require('../config/formatDate');

const newDiary = async (diary) => {
    return data.newDiary(diary);
};

const deleteDiary = (id) => {
    return data.deleteDiary(id);
};

const getDiary = async (id) => {
    const comments = await data.getComments(id);
    const diary = await data.getDiary(id);
    return {
        createdOn: formatDate.format(diary[0].created_on),
        text: diary[0].text,
        feeling: diary[0].feeling,
        agreement: diary[0].agreement,
        userID: diary[0].user_id,
        id: diary[0].diary_id,
        comments: comments.map((comment) => ({
            id: comment.comment_id,
            createdOn: formatDate.format(comment.created_on),
            text: comment.text,
            type: comment.comment_type,
            diaryID: comment.diary_id,
        }))
    };
};

const getDiariesByUser = async (id) => {
    const diaries = await data.getDiariesByUser(id);
    return diaries.map((diary) => ({
        createdOn: formatDate.format(diary.created_on),
        text: diary.text,
        feeling: diary.feeling,
        agreement: diary.agreement,
        userID: diary.user_id,
        id: diary.diary_id
    }));
};

const getDiariesByPsychologist = async (id) => {
    const diaries = await data.getDiariesByPsychologist(id);
    return diaries.map((diary) => ({
        createdOn: formatDate.format(diary.created_on),
        text: diary.text,
        feeling: diary.feeling,
        agreement: diary.agreement,
        userID: diary.user_id,
        id: diary.diary_id
    }));
}

const updateDiary = (diary, id) => {
    return data.updateDiary(diary, id);
};

const createComment = (comment) => {
    return data.createComment(comment);
};


module.exports = {
    newDiary,
    deleteDiary,
    getDiary,
    getDiariesByUser,
    updateDiary,
    createComment,
    getDiariesByPsychologist,
};