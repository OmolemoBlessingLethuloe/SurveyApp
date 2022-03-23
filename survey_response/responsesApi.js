const express = require("express");
const dboperations = require("../survey_response/responses");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       required:
 *         - SurveyId
 *         - UserId
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the survey
 *         SurveyId:
 *           type: string
 *           description: The survey the response belongs to
 *         UserId:
 *           type: string
 *           description: The user who answered the survey question
 *         Status:
 *           type: bit
 *           description: The status of the answering of surveys
 *
 *       example:
 *         Id: d5fE_asz
 *         SurveyId: PLrkel98
 *         UserId: QCrerpA8
 *         Status: 1
 */

/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Responses Api
 */

/**
 * @swagger
 * /responses:
 *   get:
 *     summary: Returns the list of all the Responses
 *     tags: [Responses]
 *     responses:
 *       200:
 *         description: The list of the responses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Response'
 */

router.get("/", (req, res) => {
  dboperations.getAllResponses().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /responses/{id}:
 *   get:
 *     summary: get the response based on id
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The response id
 *     responses:
 *       200:
 *         description: The response description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         description: The esponse was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getResponseById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /responses:
 *   post:
 *     summary: Create a new response
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 *     responses:
 *       200:
 *         description: The response was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let response = {
    Id: nanoid(idLength),
    SurveyId: req.body.SurveyId,
    UserId: req.body.UserId,
    Status: req.body.Status,
  };
  try {
    dboperations.createResponse(response).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /responses/{id}:
 *  put:
 *    summary: Update the response by the id
 *    tags: [Responses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The response id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Response'
 *    responses:
 *      200:
 *        description: The response was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *      404:
 *        description: The response was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let response = {
    Id: req.params.id,
    SurveyId: req.body.SurveyId,
    UserId: req.body.UserId,
    Status: req.body.Status,
  };
  try {
    dboperations.updateResponse(response).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /responses/{id}:
 *   delete:
 *     summary: Remove the response by id
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The response id
 *
 *     responses:
 *       200:
 *         description: The response was deleted
 *       404:
 *         description: The response was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteResponse(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});





module.exports = router;
