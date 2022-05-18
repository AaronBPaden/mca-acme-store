import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { dbconfig as con } from '../../config/dbconfig.js';
import ServerConfig from '../../config/ServerConfig.js';
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
    return !req.body.username.match(/[^a-zA-Z0-9_\-]/);
  }

  async _testNoUsernameDuplicate(req) {
    const rows = await this._execute(`
      SELECT * FROM
        ${this.table}
      WHERE username = ?;`,
      [req.body.username]
    );
    if (!rows || rows.length === 0) return true;
    // This should not be possible
    if (rows.length > 1) {
      console.log("ERROR: Duplicate username detected in database.");
    }
    return false;
  }

  async _testUsernameExistsInDB(req) {
    const rows = await this._execute(`
      SELECT * FROM
        ${this.table}
      WHERE username = ?;`,
      [req.body.username]
    );
    return rows.length === 1;
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
    const username = req.body.username;
    const generateToken = this._generateToken;
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
      if (err) {
        console.log('DAO ERROR', err);
        sendError(500, res, 'Could not complete request.');
        return;
      }
      const fields = ['username', 'password'];
      const values = [username, hash];
      let dbres;
      try {
        [dbres] = await con.execute(
          `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?, role = 'user';`,
          values,
        );
      } catch (err) {
        console.log('DAO ERROR', err);
        sendError(500, res, 'Could not complete request.');
        return;
      }
      console.log(`Creating new user ${username}`);
      const token = generateToken(username);
      res.json({
        username: username,
        token: token,
        role: 'user'
      });
    });
  }

  async _findByNameTests(req, res) {
    if (!await this._checkRequest(req, res, 'Username must be alphanumeric', this._testUsernameCharacters.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Username too long', this._testUsernameLength.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'Username does not exist', this._testUsernameExistsInDB.bind(this))) return false;
    return true;
  }

  /**
   * Validate a token
   */
  _validateToken(username, token, res) {
    let verified = false;;
    jwt.verify(token, ServerConfig.SECRET, (err, user) => {
      if (err) {
        console.log(`Attempted access with invalid token: ${username}`, err);
        res.sendStatus(403)
        return;
      }
      verified = username === user.username;
    })
    return verified;
  }

  /**
   * Validate user session. Token required for validation.
   * @param {Request} req an express Request object
   * @param {Response} res an express Response object
   */
  async validateLogin(req, res) {
    if (!await this._findByNameTests(req, res)) return;
    if (!this._validateToken(req.body.username, req.body.token, res)) return;
    res.json({
      success: true
    });
  }

  /**
   * Greate a JSON Web Token
   * Info taken from tutorial at https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
   * @private
   *
   * @param {string} username
   *
   * // TODO: verify what this type is called
   * @return {Token} a jwt token
   */
  _generateToken(username) {
    return jwt.sign({username: username}, ServerConfig.SECRET, {expiresIn: '60s'});
  }

  async _testPasswordCorrect(req) {
    const rows = await this._execute(`
      select password from ${this.table} where username = ?;`,
      [req.body.username]
    );
    const hash = rows.password;
    return await bcrypt.compare(req.body.password, hash);
  }

  /**
   * return the user's role from the database.
   * @private
   *
   * @param {string} username
   * @returns {string|undefined} returns the users role
   */
  async _getRole(username) {
    const rows = await this._execute(`
      SELECT role FROM user WHERE username = ?;`,
      [username]
    );
    if (rows.length === 1) return rows[0].role;
  }

  async _loginTests(req, res) {
    if (!await this._checkRequest(req, res, 'login failed', this._testUsernameLength.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'login failed', this._testUsernameCharacters.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'login failed', this._testUsernameExistsInDB.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'login failed', this._testPasswordExists.bind(this))) return false;
    if (!await this._checkRequest(req, res, 'login failed', this._testPasswordLength.bind(this))) return false;
    return true;
  }

  /**
   * process login request
   * @param {Request} req an express Request object
   * @param {Response} res an express Response object
   */
  async login(req, res) {
    if (!await this._loginTests(req, res)) return;
    const username = req.body.username;
    const token = this._generateToken(username)
    const role = await this._getRole(username);
    res.json({
      username: username,
      token: token,
      role: role
    });
  }

}

export {
  UserDao,
};
