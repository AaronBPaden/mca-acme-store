"use strict";

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
        this.spreadRows(res, rows);
      }
    );
  }
  /**
   * Find a single item on a table.
   * @param {Response} res - an express Response object
   * @param {int} id - the unique key for the table
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
        this.spreadRows(res, rows);
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
        this.spreadRows(res, rows);
      }
    );
  }
  /**
   * Add rows to a json response. If there are multiple rows,
   * an array is returned in the response. Otherwise, a single object
   * is returned.
   *
   * @param {Response} res - an express Response object
   * @param {array} rows - a list of rows from the database
   */
  spreadRows(res, rows) {
    rows.length === 1 ? res.json(...rows) : res.json(rows);
  }
}

export default Dao;
