const express = require("express");
const dboperations = require('../survey_response_answers/answers');


const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - QuestionId
 *         - PossibleAnswers
 *         - Text
 *         - Answer
 *         - Name
 *         - Category
 *       properties:
 *         QuestionId:
 *           type: string
 *           description: The id of the question
 *         PossibleAnswers:
 *           type: string
 *           description: The possible answers for the question
 *         Text:
 *           type: string
 *           description: The question text
 *         Answer:
 *           type: string
 *           description: The answer received from user
 *         Name:
 *           type: string
 *           description: The name of the survey
 *         Category:
 *           type: string
 *           description: The category of the survey 
 *
 *       example:
 *         QuestionId: d5fE_asz
 *         PossibleAnswers: live by “Hakuna Matata”.,“YOLO”
 *         Text: Would You Rather
 *         Answer: live by “Hakuna Matata”
 *         Name: Would You Rather
 *         Category: Funny
 *         
 */

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reports Api
 */

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Returns the list of all the reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: The list of the reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 */

 router.get("/", (req, res) => {
    dboperations.getView().then((result) => {
      res.status(200).json(result[0]);
    });
  });


  module.exports = router;
