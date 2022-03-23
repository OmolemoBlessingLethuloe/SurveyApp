const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const userRouter = require("./users/usersApi");
const surveyRouter = require("./survey/surveysApi");
const questionRouter = require("./questions/questionsApi");
const responseRouter = require("./survey_response/responsesApi");
const answerRouter = require("./survey_response_answers/answersApi");
const accountRouter = require("./authentication/authenticationApi");
const reportRouter = require("./reports/reportsApi");



const PORT = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Survey API",
      version: "1.0.0",
      description: "A survey website API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./users/usersApi.js","./authentication/authenticationApi.js","./survey/surveysApi.js","./questions/questionsApi.js","./survey_response/responsesApi.js","./survey_response_answers/answersApi.js","./reports/reportsApi.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/users", userRouter);
app.use("/accounts", accountRouter);
app.use("/surveys", surveyRouter);
app.use("/questions", questionRouter);
app.use("/responses", responseRouter);
app.use("/answers", answerRouter);
app.use("/reports", reportRouter);


app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
