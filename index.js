const functions = require('@google-cloud/functions-framework');
const Schedule = require('./scheduler');
const eventBodySchema = require('./validator');

/**
 * 
 * @param {functions.Request} req 
 * @param {functions.Response} res 
 */

function handler(req, res) {
  const params = eventBodySchema.validate(req.body);
  if (params.error) {
    console.log(params.error);
    res.status(400).json({
      message: 'Error',
      data: params.error
    })
  }
  Schedule(params.value).then((response) => {
    res.json({
      message: 'Ok',
      data: response
    })
  }).catch((reason) => {
    res.status(500).json({
      message: reason
    })
  })
}

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http('schedule', handler);

module.exports = handler
