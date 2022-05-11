"use strict";

import { dbconfig as con } from '../config/dbconfig.js';

class Dao {
  findAll(res, table) {
    con.execute(
      `SELECT * FROM ${table};`,
      (err, rows) => {
        if (err) {
          console.log('DAO ERROR', err);
          return;
        }
        this.spreadRows(res, rows);
      }
    );
  }
  findById(res, table, id) {
    con.execute(
      `SELECT * FROM ${table} WHERE ${table}_id = ?;`,
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
  countAll(res, table) {
    con.execute(
      `SELECT count(*) FROM ${table};`,
      (err, rows) => {
        if (err) {
          console.log('DAO ERROR', err);
          return;
        }
        this.spreadRows(res, rows);
      }
    );
  }
  spreadRows(res, rows) {
    rows.length === 1 ? res.json(...rows) : res.json(rows);
  }
}

export default Dao;
