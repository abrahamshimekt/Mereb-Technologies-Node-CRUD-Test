const Joi = require('joi');
 class UpdatePersonValidator {
    static updateValidator(person) {
        // Define a Joi schema for the person object
        const schema = Joi.object({
            name: Joi.string(), 
            age: Joi.number().integer().min(0).max(120), 
            hobbies: Joi.array().items(Joi.string()).default([])
        });
        // Validate the person object against the schema
        return schema.validate(person);
    }
}
module.exports = UpdatePersonValidator;