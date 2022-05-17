import { dbconfig as con } from '../config/dbconfig.js';
import DaoCommon from './daoCommon.js';

/**
 * Class representing a generic Data Access Object,
 * providing generic interfaces to a datbase table. */
class DaoPublic extends DaoCommon {
  /**
   * Finda all items in a table.
   * @param {Response} res - an express Response object
   */
  findAll(res) {
    con.execute(
      `SELECT * FROM ${this.table};`,
      (err, rows) => {
        if (err) {
          console.log('DAO ERROR', err);
          return;
        }
        this._spreadRows(res, rows);
      }
    );
  }
  /**
   * Find a single item on a table.
   * @param {Response} res - an express Response object
   * @param {number} id - the unique key for the table
   */
  findById(res, id) {
    con.execute(
      `SELECT * FROM ${this.table} WHERE ${this.table}_id = ?;`,
      [id],
      (err, rows) => {
        if (err) {
          console.log('DAO ERROR', err);
          return;
        }
        this._spreadRows(res, rows);
      }
    );
  }
  /**
   * Get a count for the number of records in a table.
   * @param {Response} res - an express Response object
   */
  countAll(res) {
    con.execute(
      `SELECT count(*) FROM ${this.table};`,
      (err, rows) => {
        if (err) {
          console.log('DAO ERROR', err);
          return;
        }
        this._spreadRows(res, rows);
      }
    );
  }
}

export default DaoPublic;
