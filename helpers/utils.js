/**
* Validate the two parameters
* @param {object} requiredParams - The required parameters
* @param {object} params - Input object to be validated
* @param {boolean} exact -
*/
function validateParams(requiredParams, params, exact) {
  // Exact check
  if (exact && Object.keys(requiredParams).length !== Object.keys(params).length) {
    return { err: { message: 'Number of keys are not equal' } };
  }

  /* eslint-disable no-restricted-syntax, valid-typeof, no-unused-vars, no-console */
  for (const [k] of Object.entries(requiredParams)) {
    const value = requiredParams[k];

    if (params[k] === undefined) {
      console.log(k, params[k]);
      return { err: { message: `Required key doesn't exist ${k}` } };
    }

    if (!Object.keys(value).includes('default')) { // If object (without default)
      const interRes = validateParams(value, params[k], exact);
      if (interRes.err) { return interRes; }
    } else {
      // Check if key exists
      if (params[k] === undefined) {
        if (value.default === null) { return { err: { message: `Required key doesn't exist ${k}` } }; }
        params[k] = value.default;
      }

      // Check if type matches
      if (Array.isArray(value.type)) {
        if (!value.type.includes(typeof params[k])) {
          if (value.default === null) { return { err: { message: `Key Type doesn't match ${k}` } }; }
          params[k] = value.default;
        }
      } else if (typeof params[k] !== value.type) {
        if (value.default === null) { return { err: { message: `Key Type doesn't match ${k}` } }; }
        params[k] = value.default;
      }
    }
  } // for end
  /* eslint-enable no-restricted-syntax valid-typeof, valid-typeof, no-unused-vars, no-console */
  return params;
}

/** Exports */
module.exports = {
  validateParams,
};
