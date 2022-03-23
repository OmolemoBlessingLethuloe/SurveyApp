var config = require("../config/dbconfig");
const sql = require("mssql/msnodesqlv8");

async function createNewTable(){
  try {
    let pool = await sql.connect(config);

    var query = "CREATE TABLE Questions  (Id VarChar(255) PRIMARY KEY, SurveyId VarChar(255) REFERENCES Surveys (Id), Text VarChar(255), PossibleAnswers)";
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// createNewTable()
async function getAllQuestions() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Questions");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getQuestionById(id) {
  try {
    let question = await sql.connect(config);
    let questions = await question
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Questions WHERE Id = @input_parameter");
    return questions.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createQuestion(postQuestion) {
  try {
    let question = await sql.connect(config);
    let insertQuestion = await question
      .request()
      .input("Id", sql.VarChar, postQuestion.Id)
      .input("SurveyId", sql.VarChar, postQuestion.SurveyId)
      .input("Text", sql.VarChar, postQuestion.Text)
      .input("PossibleAnswers", sql.VarChar, postQuestion.PossibleAnswers)
      .query(
        "INSERT INTO Questions (Id,SurveyId,Text,PossibleAnswers) VALUES (@Id,@SurveyId,@Text,@PossibleAnswers)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertQuestion.parameters.Id.value,
      SurveyId: insertQuestion.parameters.SurveyId.value,
      Text: insertQuestion.parameters.Text.value,
      PossibleAnswers: insertQuestion.parameters.PossibleAnswers.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteQuestion(id) {
  try {
    let question = await sql.connect(config);
    let questionList = await question
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Questions WHERE Id = @input_parameter");
    return questionList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateQuestion(questionUp) {
  try {
    let updatedQuestion = await sql.connect(config);
    let questions = await updatedQuestion
      .request()
      .input("Id", sql.VarChar, questionUp.Id)
      .input("SurveyId", sql.VarChar, questionUp.SurveyId)
      .input("Text", sql.VarChar, questionUp.Text)
      .input("PossibleAnswers", sql.VarChar, questionUp.PossibleAnswers)
      .query(
        "UPDATE Surveys SET SurveyId=@SurveyId,Text=@Text,PossibleAnswers=@PossibleAnswers WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: questions.parameters.Id.value,
      SurveyId: questions.parameters.SurveyId.value,
      Text: questions.parameters.Text.value,
      PossibleAnswers: questions.parameters.PossibleAnswers.value,
    };
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestions,
  getQuestionById,
};
