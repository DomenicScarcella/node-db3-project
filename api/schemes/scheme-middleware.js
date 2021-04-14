const Schemes = require('./scheme-model.js');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Schemes.findById(req.params.id);
    if (!scheme) {
      next({ status: 404, message: `scheme with scheme_id ${req.body.id} not found` });
    } else {
      req.scheme = scheme;
      next();
    }
  } catch (err) {
    next(err);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const name = req.body.scheme_name;
  if (
    !name ||
    name.trim() === '' ||
    typeof name !== 'string'
  ) {
    return next({ status: 400, message: 'invalid scheme_name' });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const inst = req.body.instructions;
  const step = req.body.step_number;
  if (
    !inst ||
    inst.trim() === '' ||
    typeof inst !== 'string' ||
    isNaN(step) ||
    step < 1
  ) {
    return next({ status: 400, message: 'invalid step'});
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
