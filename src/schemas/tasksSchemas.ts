import Joi, { ObjectSchema } from 'joi';

const tasksSchemas: ObjectSchema = Joi.object({
  task: Joi.string().required().empty().messages({
    'any.required': '401|Task field is required',
    'string.empty': '400|All fields must be filled',
    'string.base': '422|Task field must be a string',
  }),
});

export default tasksSchemas;
