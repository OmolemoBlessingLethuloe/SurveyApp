class Question {
    constructor(Id, SurveyId, Text, PossibleAnswers) {
      this.Id = Id;
      this.SurveyId = SurveyId;
      this.Text = Text;
      this.PossibleAnswers = PossibleAnswers;
    }
  }
  
  module.exports = Question;
  