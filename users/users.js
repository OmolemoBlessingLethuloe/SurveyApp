var config = require("../config/dbconfig");
const sql = require("mssql/msnodesqlv8");

var passwordHash = require('password-hash');

async function createNewTable(){
  try {
    let pool = await sql.connect(config);

    var query = "CREATE TABLE Users  (Id VarChar(255) PRIMARY KEY, Name VarChar(255), Email VarChar(255), Password VarChar(255), Favorites VarChar(2550), isAdmin Bit)";
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// createNewTable()
async function getAllUsers() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Users");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Users WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function login(userDetails) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar, userDetails.Email)
      .query("SELECT * FROM Users WHERE Email = @input_parameter");

      console.log('found user',todo.recordsets)
    let emailExists=todo.recordsets[0].length;
    let userFound=todo.recordsets[0][0];
    console.log('password',userDetails.Password,userFound.Password)
    let validate= await  unhashPassword(userDetails.Password,userFound.Password);
    console.log('validated',validate)
      if(emailExists && validate){
        return todo.recordsets[0][0];
      }else{
        return false;
      }
  
  } catch (error) {
    console.log(error);
  }
}

async function validateUniqueUser(email) {
  try {
    let user = await sql.connect(config);

    let userfound = await user
      .request()
      .input("user_email", sql.VarChar(255), email)
      .query("SELECT * FROM Users WHERE Email = @user_email");

    return userfound.recordset.length;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(postUser) {
  try {
    let user = await sql.connect(config);
    let insertUser = await user
      .request()
      .input("Id", sql.VarChar, postUser.Id)
      .input("Name", sql.VarChar, postUser.Name)
      .input("Email", sql.VarChar, postUser.Email)
      .input("Password", sql.VarChar, postUser.Password)
      .input("Favorites", sql.VarChar, postUser.Favorites)
      .input("IsAdmin", sql.Bit, postUser.IsAdmin)
      .query(
        "INSERT INTO Users (Id,Name,Email,Password,Favorites,IsAdmin) VALUES (@Id,@Name,@Email,@Password,@Favorites,@isAdmin)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertUser.parameters.Id.value,
      Name: insertUser.parameters.Name.value,
      Email: insertUser.parameters.Email.value,
      Password: insertUser.parameters.Password.value,
      Favorites: insertUser.parameters.Favorites.value,
      IsAdmin: insertUser.parameters.IsAdmin.value,
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(id) {
  try {
    let user = await sql.connect(config);
    let userList = await user
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Users WHERE Id = @input_parameter");
    return userList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateUser(userUp) {
  try {
    let updatedUser = await sql.connect(config);
    let users = await updatedUser
      .request()
      .input("Id", sql.VarChar, userUp.Id)
      .input("Name", sql.VarChar, userUp.Name)
      .input("Email", sql.VarChar, userUp.Email)
      .input("Password", sql.VarChar, userUp.Password)
      .input("Favorites", sql.VarChar, userUp.Favorites)
      .input("IsAdmin", sql.Bit, userUp.IsAdmin)
      .query(
        "UPDATE Users SET Name=@Name,Email=@Email,Password=@Password,Favorites=@Favorites,IsAdmin=@IsAdmin WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: users.parameters.Id.value,
      Name: users.parameters.Name.value,
      Email: users.parameters.Email.value,
      Password: users.parameters.Password.value,
      Favorites: users.parameters.Favorites.value,
      IsAdmin: users.parameters.IsAdmin.value,
    };
  } catch (error) {
    console.log(error);
  }
}

function unhashPassword(entered,hashed){
  return (passwordHash.verify(entered,hashed))
}

module.exports = {
  createUser,
  validateUniqueUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  login
};
