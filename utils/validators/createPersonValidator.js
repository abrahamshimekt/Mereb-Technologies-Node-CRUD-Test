const Joi = require('joi');
 class CreatePersonValidator {
    static createValidator(person) {
        // Define a Joi schema for the person object
        const schema = Joi.object({
            name: Joi.string().required(), 
            age: Joi.number().integer().min(0).max(120).required(), 
            hobbies: Joi.array().items(Joi.string()).min(1).required() 
        });
        // Validate the person object against the schema
        return schema.validate(person);
    }
}
module.exports = CreatePersonValidator;