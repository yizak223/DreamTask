const Joi = require('joi');

const schema = Joi.object({
  reqId: Joi.string().required().messages({
    'string.base': 'reqId should be a string',
    'string.empty': 'reqId cannot be empty',
    'any.required': 'reqId is required'
  }),
  ip: Joi.string().ip({ version: ['ipv4', 'ipv6'] }).required().messages({
    'string.base': 'ip should be a string',
    'string.empty': 'ip cannot be empty',
    'string.ip': 'ip must be a valid IP address',
    'any.required': 'ip is required'
  })
});

function validateRequest(request) {
  return schema.validate(request);
}

module.exports = { validateRequest };
