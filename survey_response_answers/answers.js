var config = require("../config/dbconfig");
const sql = require("mssql/msnodesqlv8");

async function createNewTable() {
    try {
        let pool = await sql.connect(config);

        var query = "CREATE TABLE Answers  (Id VarChar(255) PRIMARY KEY, ResponseId VarChar(255) REFERENCES Responses (Id), QuestionId VarChar(255) REFERENCES Questions (Id), Answer VarChar(255))";
        let products = await pool.request().query(query);
        return products.recordsets;
    } catch (error) {
        console.log(error);
    }
}

// createNewTable()
async function getAllAnswers() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * FROM Answers");
        return products.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function getView() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query(`SELECT TestingJoins.Text, TestingJoins.Name, SUBSTRING(TestingJoins.Answer,1,30) AS Answer, TestingJoins.QuestionId,TestingJoins.PossibleAnswers, count(Answer) as Counting
        FROM TestingJoins
        GROUP BY  TestingJoins.Text, TestingJoins.Name, TestingJoins.Answer, TestingJoins.PossibleAnswers, TestingJoins.QuestionId`);
        return products.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getAnswerById(id) {
    try {
        let answer = await sql.connect(config);
        let answers = await answer
            .request()
            .input("input_parameter", sql.VarChar, id)
            .query("SELECT * FROM Answers WHERE Id = @input_parameter");
        return answers.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function createAnswer(postAnswer) {
    function multiInserter(postAns) {

        let values = '';
        postAns.forEach(({ Id, ResponseId, QuestionId, Answer }) => {
            values += `('${Id.toString()}','${ResponseId}','${QuestionId}','${Answer}'),`;
        })
        values = values.substring(0, values.length - 1);
        return values;
    }
    try {
        let answer = await sql.connect(config);
        let insertAnswer = await answer
            .request()
            .query(
                `INSERT INTO Answers (Id,ResponseId,QuestionId,Answer) VALUES ${multiInserter(postAnswer)}`,
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            message: 'all answers were posted'
        };
    } catch (err) {
        console.log(err);
    }
}

async function deleteAnswer(id) {
    try {
        let answer = await sql.connect(config);
        let answerList = await answer
            .request()
            .input("input_parameter", sql.VarChar, id)
            .query("DELETE FROM Answers WHERE Id = @input_parameter");
        return answerList.recordsets;
    } catch (error) {
        console.log(error);
    }
}
async function updateAnswer(answerUp) {
    try {
        let updatedAnswer = await sql.connect(config);
        let answers = await updatedAnswer
            .request()
            .input("Id", sql.VarChar, answerUp.Id)
            .input("ResponseId", sql.VarChar, answerUp.ResponseId)
            .input("QuestionId", sql.VarChar, answerUp.QuestionId)
            .input("Answer", sql.VarChar, answerUp.Answer)
            .query(
                "UPDATE Answers SET ResponseId=@ResponseId,QuestionId=@QuestionId,Answer=@Answer WHERE Id = @Id",
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            Id: answers.parameters.Id.value,
            ResponseId: answers.parameters.ResponseId.value,
            QuestionId: answers.parameters.QuestionId.value,
            Answer: answers.parameters.Answer.value,
        };
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    createAnswer,
    deleteAnswer,
    updateAnswer,
    getAllAnswers,
    getAnswerById,
    getView,
};
