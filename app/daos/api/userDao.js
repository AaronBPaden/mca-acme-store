import bcrypt from 'bcrypt';

import { dbconfig as con } from '../../config/dbconfig.js';
import DaoCommon from '../daoCommon.js';

class UserDao extends DaoCommon {
  constructor() {
    super('user');

    // this should be increased in a real application
    this._MINIMUM_PASSWORD_LENGTH = 4;
  }

  async _testUsernameExists(req) {
    return req.body.username && req.body.username !== "";
  }

  async _testUsernameLength(req) {
    const length = req.body.username.length;
    return length > 0 && length < 51;
  }

  async _testUsernameCharacters(req) {
    return !req.body.username.match(/[^a-z0-9_\-]/);
  }

  async _testNoUsernameDuplicate(req) {
    const rows = await this._execute(`
      SELECT * FROM
        ${this.table}
      WHERE username = '${req.body.username}';`,
    );
    if (!rows) return true;
    // This should not be possible
    if (rows.length > 1) {
      console.log("ERROR: Duplicate username detected in database.");
    }
    return false;
  }

  async _testPasswordExists(req) {
    return req.body.password && req.body.password !== "";
  }

  async _testPasswordLength(req) {
    return req.body.password.length >= this._MINIMUM_PASSWORD_LENGTH
  }

  async _testConfirmPasswordExists(req) {
    return req.body.confirmPassword;
  }

  async _testPasswordConfirmed(req) {
    return req.body.password === req.body.confirmPassword;
  }

  async _createTests(req, res) {
    if (!await this._checkRequest(req, res, 'Username required', this._testUsernameExists.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Username too long', this._testUsernameLength.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Username must be alphanumeric', this._testUsernameCharacters.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Password required.', this._testPasswordExists.bind(this))) return false;
    if (!await this._checkRequest(req, res, `Password must be at least ${this._MINIMUM_PASSWORD_LENGTH} characters`, this._testPasswordLength.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Must confirm password', this._testConfirmPasswordExists.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Passwords do not match', this._testPasswordConfirmed.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Username taken', this._testNoUsernameDuplicate.bind(this))) return false;
    return true;
  }

  /**
   * Validate and create a new user
   * @param {Request} req an express Request object
   * @param {Response} res an express Response object
   */
  async create(req, res) {
    if (!await this._createTests(req, res)) return;
    const saltRounds = 10;
    const table = this.table;
    const sendError = this._sendError;
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
      if (err) {
        console.log('DAO ERROR', err);
        sendError(500, res, 'Could not complete request.');
        return;
      }
      const fields = ['username', 'password'];
      const values = [req.body.username, hash];
      let dbres;
      try {
        [dbres] = con.execute(
          `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
          values,
        );
      } catch (err) {
        console.log('DAO ERROR', err);
        sendError(500, res, 'Could not complete request.');
        return;
      }
      console.log(`Creating new user ${JSON.stringify(dbres)}`);
      res.json({
        user: req.body.username
      });
    });
  }
}

export {
  UserDao,
};
