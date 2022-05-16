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
}

export default Dao;
