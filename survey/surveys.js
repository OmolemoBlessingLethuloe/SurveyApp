var config = require("../config/dbconfig");
const sql = require("mssql/msnodesqlv8");

async function createNewTable(){
  try {
    let pool = await sql.connect(config);

    var query = "CREATE TABLE Surveys  (Id VarChar(255) PRIMARY KEY, Name VarChar(255), CreatedBy VarChar(255) REFERENCES Users (Id), Category VarChar(255))";
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// createNewTable()
async function getAllSurveys() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Surveys");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getSurveyById(id) {
  try {
    let survey = await sql.connect(config);
    let surveys = await survey
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Surveys WHERE Id = @input_parameter");
    return surveys.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createSurvey(postSurvey) {
  try {
    let survey = await sql.connect(config);
    let insertSurvey = await survey
      .request()
      .input("Id", sql.VarChar, postSurvey.Id)
      .input("Name", sql.VarChar, postSurvey.Name)
      .input("CreatedBy", sql.VarChar, postSurvey.CreatedBy)
      .input("Category", sql.VarChar, postSurvey.Category)
      .query(
        "INSERT INTO Surveys (Id,Name,CreatedBy,Category) VALUES (@Id,@Name,@CreatedBy,@Category)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertSurvey.parameters.Id.value,
      Name: insertSurvey.parameters.Name.value,
      CreatedBy: insertSurvey.parameters.CreatedBy.value,
      Category: insertSurvey.parameters.Category.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteSurvey(id) {
  try {
    let survey = await sql.connect(config);
    let surveyList = await survey
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Surveys WHERE Id = @input_parameter");
    return surveyList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateSurvey(surveyUp) {
  try {
    let updatedSurvey = await sql.connect(config);
    let surveys = await updatedSurvey
      .request()
      .input("Id", sql.VarChar, surveyUp.Id)
      .input("Name", sql.VarChar, surveyUp.Name)
      .input("CreatedBy", sql.VarChar, surveyUp.CreatedBy)
      .input("Category", sql.VarChar, surveyUp.Category)
      .query(
        "UPDATE Surveys SET Name=@Name,CreatedBy=@CreatedBy,Category=@Category WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: surveys.parameters.Id.value,
      Name: surveys.parameters.Name.value,
      CreatedBy: surveys.parameters.CreatedBy.value,
      Category: surveys.parameters.Category.value,
    };
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  createSurvey,
  deleteSurvey,
  updateSurvey,
  getAllSurveys,
  getSurveyById,
};
