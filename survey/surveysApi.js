const express = require("express");
const dboperations = require("./surveys");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Survey:
 *       type: object
 *       required:
 *         - Name
 *         - CreatedBy
 *         - Category
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the survey
 *         Name:
 *           type: string
 *           description: The name of the survey
 *         CreatedBy:
 *           type: string
 *           description: The user who created the survey
 *         Category:
 *           type: string
 *           description: The category into which the survey was created
 *
 *       example:
 *         Id: d5fE_asz
 *         Name: Hottest Fashion Trends
 *         CreatedBy: d5fE_asz
 *         Category: Fashion
 */

/**
 * @swagger
 * tags:
 *   name: Surveys
 *   description: Survey Api
 */

/**
 * @swagger
 * /surveys:
 *   get:
 *     summary: Returns the list of all the Surveys
 *     tags: [Surveys]
 *     responses:
 *       200:
 *         description: The list of the surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Survey'
 */

router.get("/", (req, res) => {
  dboperations.getAllSurveys().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /surveys/{id}:
 *   get:
 *     summary: get the survey based on id
 *     tags: [Surveys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The survey id
 *     responses:
 *       200:
 *         description: The survey description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Survey'
 *       404:
 *         description: The survey was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getSurveyById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /surveys:
 *   post:
 *     summary: Create a new survey
 *     tags: [Surveys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Survey'
 *     responses:
 *       200:
 *         description: The survey was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Survey'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let survey = {
    Id: nanoid(idLength),
    Name: req.body.Name,
    CreatedBy: req.body.CreatedBy,
    Category: req.body.Category,
  };
  try {
    dboperations.createSurvey(survey).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /surveys/{id}:
 *  put:
 *    summary: Update the survey by the id
 *    tags: [Surveys]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The survey id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: The survey was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      404:
 *        description: The survey was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let survey = {
    Id: req.params.id,
    Name: req.body.Name,
    CreatedBy: req.body.CreatedBy,
    Category: req.body.Category,
  };
  try {
    dboperations.updateSurvey(survey).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /surveys/{id}:
 *   delete:
 *     summary: Remove the survey by id
 *     tags: [Surveys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The survey id
 *
 *     responses:
 *       200:
 *         description: The survey was deleted
 *       404:
 *         description: The survey was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteSurvey(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});





module.exports = router;
