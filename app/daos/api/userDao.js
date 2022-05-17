import bcrypt from 'bcrypt';

import { dbconfig as con } from '../../config/dbconfig.js';
import DaoCommon from '../daoCommon.js';

class UserDao extends DaoCommon {
  constructor() {
    super('user');

    // this should be increased in a real application
    this._MINIMUM_PASSWORD_LENGTH = 4;
  }

  _testUsernameExists(req) {
    return req.body.username && req.body.username !== "";
  }

  _testUsernameLength(req) {
    const length = req.body.username.length;
    return length > 0 && length < 51;
  }

  _testUsernameCharacters(req) {
    return !req.body.username.match(/[[^a-z0-9_\-]]/);
  }

  _testNoUsernameDuplicate(req) {
    const unique = true;
    con.execute(`
      SELECT * FROM
        ${this.table}
      WHERE username = '${req.body.username}';`,
      (err, rows) => {
        if (err) {
          console.log('DAO ERROR', err);
          return;
        }
        if (rows.length === 1) {
          unique = false;
        }
        // This should not be possible.
        if (rows.length > 1) {
          console.log("ERROR: Duplicate username detected in database.");
          unique = false;
        }
      }
    );
    return unique;
  }

  _testPasswordExists(req) {
    return req.body.password && req.body.password !== "";
  }

  _testPasswordLength(req) {
    return req.body.password.length >= this._MINIMUM_PASSWORD_LENGTH
  }

  _testConfirmPasswordExists(req) {
    return req.body.confirmPassword;
  }

  _testPasswordConfirmed(req) {
    return req.body.password === req.body.confirmPassword;
  }

  _createTests(req, res) {
    if (!this._checkRequest(req, res, 'Username required', this._testUsernameExists.bind(this))) return false;
    if (!this._checkRequest(req, res, 'Username too long', this._testUsernameLength.bind(this))) return false;
    if (!this._checkRequest(req, res, 'Username must be alphanumeric', this._testUsernameCharacters.bind(this))) return false;
    if (!this._checkRequest(req, res, 'Password required.', this._testPasswordExists.bind(this))) return false;
    if (!this._checkRequest(req, res, `Password must be at least ${this._MINIMUM_PASSWORD_LENGTH} characters`, this._testPasswordLength.bind(this))) return false;
    if (!this._checkRequest(req, res, 'Must confirm password', this._testConfirmPasswordExists.bind(this))) return false;
    if (!this._checkRequest(req, res, 'Passwords do not match', this._testPasswordConfirmed.bind(this))) return false;
    if (!this._checkRequest(req, res, 'Username taken', this._testNoUsernameDuplicate.bind(this))) return false;
    return true;
  }

  /**
   * Validate and create a new user
   * @param {Request} req an express Request object
   * @param {Response} res an express Response object
   */
  async create(req, res) {
    if (!this._createTests(req)) return;
    const saltRounds = 10;
    const table = this.table;
    const sendError = this._sendError;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if (err) {
        console.log('DAO ERROR', err);
        sendError(500, res, 'Could not complete request.');
        return;
      }
      const fields = ['username', 'password'];
      const values = [req.body.username, hash];
      con.execute(
        `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
        values,
        (err, dbres) => {
          if (err) {
            console.log('DAO ERROR', err);
            sendError(500, res, 'Could not complete request.');
            return;
          }
          console.log(`Creating new user ${JSON.stringify(dbres)}`);
          res.json({
            user: req.body.username
          });
        }
      );
    });
  }

}

export {
  UserDao,
};
