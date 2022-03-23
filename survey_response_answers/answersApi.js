const express = require("express");
const dboperations = require("./answers");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - ResponseId
 *         - QuestionId
 *         - Answer
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the answer
 *         ResponseId:
 *           type: string
 *           description: The response received from user
 *         QuestionId:
 *           type: string
 *           description: The question being answered
 *         Answer:
 *           type: string
 *           description: The answer received from user
 *
 *       example:
 *         Id: d5fE_asz
 *         ResponseId: QNOOCYqZ
 *         QuestionId: d5fE_asz
 *         Answer: Fashion
 */

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Answers Api
 */

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Returns the list of all the Answers
 *     tags: [Answers]
 *     responses:
 *       200:
 *         description: The list of the answers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 */

router.get("/", (req, res) => {
  dboperations.getAllAnswers().then((result) => {
    res.status(200).json(result[0]);
  });
});


/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     summary: get the answer based on id
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Answer id
 *     responses:
 *       200:
 *         description: The Answer description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: The Answer was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getAnswersById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /answers:
 *   post:
 *     summary: Create a new answer
 *     tags: [Answers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: The answer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let answers = req.body.map(record=>({...record,Id: nanoid(idLength)}));

  try {
    dboperations.createAnswer(answers).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    TRX.commit() 
    TRX.rollback()
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /answers/{id}:
 *  put:
 *    summary: Update the answer by the id
 *    tags: [Answers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The answer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Answer'
 *    responses:
 *      200:
 *        description: The answer was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Answer'
 *      404:
 *        description: The answer was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let answer = {
    Id: req.params.id,
    ResponseId: req.body.ResponseId,
    QuestionId: req.body.QuestionId,
    Answer: req.body.Answer,
  };
  try {
    dboperations.updateAnswer(answer).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Remove the answer by id
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The answer id
 *
 *     responses:
 *       200:
 *         description: The answer was deleted
 *       404:
 *         description: The answer was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteAnswer(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});





module.exports = router;
