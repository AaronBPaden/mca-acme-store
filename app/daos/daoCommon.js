import { dbconfig as con } from '../config/dbconfig.js';

/**
 * Class representing a generic Data Access Object,
 * providing generic interfaces to a datbase table. */
class Dao {
  /**
   * Create a Dao
   * @param {string} table - the mysql table the dao represents.
   */
  constructor(table) {
    this.table = table;
  }
  /**
   * Add rows to a json response. If there are multiple rows,
   * an array is returned in the response. Otherwise, a single object
   * is returned.
   *
   * @param {Response} res - an express Response object
   * @param {array} rows - a list of rows from the database
   */
  _spreadRows(res, rows) {
    rows.length === 1 ? res.json(...rows) : res.json(rows);
  }

  /**
   * Set a status code and put an error message in the response.
   * @private
   *
   * @param {number} status - an http status code
   * @param {Response} res - an express Rsponse object
   */
  _sendError(status, res, message) {
    res.status(status).json(({
      error: true,
      message: message
    }));
  }

  /**
   * Run a validation check.
   * @private
   *
   * @callback checkCallback
   * @param {Request} req an http request
   * @returns {boolean}
   */

  /**
   * Run a validation check. If the validation fails, send an error response.
   * @private
   *
   * @param {Request} req The express request to be validated
   * @param {Response} res An express response object
   * @param {string} msg An error message to send on failure
   * @param {checkCallback} validator the validation check to run
   * @returns {boolean} return true if the check passes
   */
  _checkRequest(req, res, msg, validator) {
    if (!validator(req)) {
      // Status 400 indicates a bad request
      this._sendError(400, res, msg);
      return false;
    }
    return true;
  }
}

export default Dao;
