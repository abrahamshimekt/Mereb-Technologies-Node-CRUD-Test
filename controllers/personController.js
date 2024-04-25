const app = require('../utils/app');
const CreatePersonValidator = require("../utils/validators/createPersonValidator");
const UpdatePersonValidator = require('../utils/validators/updatePersonValidator');
const UUID = require("uuid");

module.exports.getAllPersons = (req,res)=>{
    const persons = app.get("db"); // get the persons list
    if (!persons || persons.length === 0) {
      return res
        .status(404)
        .json({ isSuccess: false, message: "No persons found" });
    }
    return res.status(200).json(persons);
}
module.exports.getPersonById = (req,res)=>{
    const personId = req.params.personId;
    const persons = app.get("db"); // get persons list
    const index = persons.findIndex((person) => person.id == personId); // check if person exists
    if (index !== -1) {
      // if person is found
      return res.status(200).json(persons[index]);
    } else {
      return res
        .status(404)
        .json({ isSuccess: false, message: "Person Not Found" });
    }
}

module.exports.createPerson = (req,res)=>{
    const { error, value } = CreatePersonValidator.createValidator(req.body); // validate person being created
  if (error) {
    return res.status(400).json({
      isSuccess: false,
      message: "Validation failed",
      error: error.details[0].message,
    });
  }
  const persons = app.get("db"); // get the persons list from in memory db
  const personId = UUID.v4(); // generate UUID

  try {
    // add the person to persons list
    persons.push({
      id: personId,
      name: req.body.name,
      age: req.body.age,
      hobbies: req.body.hobbies,
    });

    app.set("db", persons); // save the current persons list

    return res.status(200).json({
      isSuccess: true,
      message: "Person created successfull",
      data: req.body.id,
    });
  } catch (error) {
    return res.status(400).json({
      isSuccess: false,
      message: "Bad request: unable to create",
      error: error.message,
    });
  }
}

module.exports.updatePerson = (req,res)=>{
    const { error, value } = UpdatePersonValidator.updateValidator(req.body); // validate the person

    if (error) {
      return res.status(400).json({
        isSuccess: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }
    const personId = req.params.personId; // get person id from request parameters
    const { name, age, hobbies } = req.body;
    const persons = app.get("db"); // get the persons list from in memory db
  
    const index = persons.findIndex((person) => person.id == personId); // find the person with specified id
  
    if (index !== -1) {
      // If person found, update its properties
      persons[index].name = name? name: persons[index].name;
      persons[index].age = age? age : persons[index].age;
      persons[index].hobbies = hobbies? hobbies: persons[index].hobbies
      app.set("db", persons);
      return res
        .status(200)
        .json({ isSuccess: true, message: "Person updated successfully" });
    } else {
      // If person not found, send failure response
      return res
        .status(404)
        .json({ isSuccess: false, message: "Person not found" });
    }
}

module.exports.deletePerson = (req,res)=>{
    const personId = req.params.personId;
    const persons = app.get("db");
  
    // Find index of the person with specified id
    const index = persons.findIndex((person) => person.id == personId);
  
    if (index !== -1) {
      // If person found, remove it from array
      persons.splice(index, 1);
      app.set("db", persons);
      return res.status(200).json({
        isSuccess: true,
        message: "Person deleted successfully",
      });
    } else {
      // If person not found, send failure response
      return res.status(400).json({
        isSuccess: false,
        message: "Deletion unsuccessful: Person not found",
      });
    }
}