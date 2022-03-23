class User {
    constructor(Id, Name, Email, Password, Favorites, IsAdmin) {
      this.Id = Id;
      this.Name = Name;
      this.Email = Email;
      this.Password = Password;
      this.Favorites = Favorites;
      this.IsAdmin = IsAdmin;
    }
  }
  
  module.exports = User;
  