const express = require("express");
const dboperations = require("./users");
const { nanoid } = require("nanoid");
var passwordHash = require('password-hash');

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Name
 *         - Password
 *         - IsAdmin
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the user
 *         Name:
 *           type: string
 *           description: The user logged in
 *         Email:
 *           type: string
 *           description: The email of the logged in user
 *         Password:
 *           type: string
 *           description: The user password
 *         Favorites:
 *           type: string
 *           description: Survey categories the user is interested in
 *         IsAdmin:
 *           type: bit
 *           description: The type of user logged in
 *
 *       example:
 *         Id: d5fE_asz
 *         Name: Omolemo lethuloe
 *         Email: dummy@gmail.com
 *         Password: testing
 *         Favorites: Funny,Survival
 *         IsAdmin: 1
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Survey Users Api
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/", (req, res) => {
  dboperations.getAllUsers().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getUserById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let user = {
    Id: nanoid(idLength),
    Name: req.body.Name,
    Email: req.body.Email,
    Password: passwordHash.generate(req.body.Password),
    Favorites: req.body.Favorites,
    IsAdmin: req.body.IsAdmin,
  };
  try {
    dboperations.validateUniqueUser(req.body.Email).then((response) => {
      if (!response) {
        dboperations.createUser(user).then((result) => {
          return res.status(200).json(result);
        });
      } else {
        return res.status(409).json({
          message: `User with ${req.body.Email} already exists`,
        });
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});
/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let user = {
    Id: req.params.id,
    Name: req.body.Name,
    Email: req.body.Email,
    Password: passwordHash.generate(req.body.Password),
    Favorites: req.body.Favorites,
    IsAdmin: req.body.IsAdmin,
  };
  try {
    dboperations.updateUser(user).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteUser(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});





module.exports = 
  router
;
