import Joi, { ObjectSchema } from 'joi';

const statusSchemas: ObjectSchema = Joi.object({
  status: Joi.string().required().empty().messages({
    'any.required': '401|Status field is required',
    'string.empty': '400|All fields must be filled',
    'string.base': '422|Status field must be a string',
  }),
});

export default statusSchemas;