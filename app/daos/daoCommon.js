"use strict";

import { dbconfig as con } from '../config/dbconfig.js';

class Dao {
  constructor(table) {
    this.table = table;
  }
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
  spreadRows(res, rows) {
    rows.length === 1 ? res.json(...rows) : res.json(rows);
  }
}

export default Dao;
