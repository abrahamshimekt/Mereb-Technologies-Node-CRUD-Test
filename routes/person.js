const express = require("express");
const router = express.Router();
const PersonController = require('../controllers/personController');

// get all persons
router.get("/",PersonController.getAllPersons);

// get person detail
router.get("/:personId",PersonController.getPersonById);
// create person
router.post("/", PersonController.createPerson);
// update person with specific id
router.put("/:personId",PersonController.updatePerson);

// delete person
router.delete("/:personId", PersonController.deletePerson);

module.exports = router;
