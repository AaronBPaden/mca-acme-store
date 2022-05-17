import { dbconfig as con } from '../../config/dbconfig.js';

import DaoPublic from '../daoPublic.js';

class ItemDao extends DaoPublic {
  constructor() {
    super('store_item');
  }

  async topItems(res) {
    const rows = await this._execute(`
      SELECT * FROM
        ${this.table}
      INNER JOIN
        top_item
      ON
        store_item.store_item_id = top_item.top_item_id`,
    );
    if (rows) this._spreadRows(res, rows);
  }

  /**
   * Select all items in a certain category.
   * @param {Response} res - The express Response object.
   * @param {string} category - The category, for example 'anvil'.
   */
  async categoryItems(res, category) {
    const rows = await this._execute(`
      SELECT * FROM
        ${this.table}
      WHERE store_item.category = '${category}';`
    );
    if (rows) this._spreadRows(res, rows);
  }

  // create: (req, res) => {
  //   if (Object.keys(req.body).length === 0) {
  //     res.json({
  //       error: true,
  //       message: "No fields to create."
  //     });
  //     return;
  //   }
  //   const fields = Object.keys(req.body);
  //   const values = Object.values(req.body);
  //   con.execute(
  //     `INSERT INTO ${dao.table} SET ${fields.join(' = ?, ')} = ?;`,
  //     values,
  //     (err, dbres) => {
  //       if(err) {
  //         console.log('DAO ERROR', err);
  //         res.send('ERROR creating record');
  //         return;
  //       }
  //       res.send(`Last id: ${dbres.insertId}`);
  //     }
  //   );
  // },
  // update: (req, res) => {
  //   if (isNaN(req.params.id)) {
  //     res.json({
  //       error: true,
  //       message: "ID must be a number"
  //     });
  //     return;
  //   }
  //   if (Object.keys(req.body).length === 0) {
  //     res.json({
  //       error: true,
  //       message: "No fields to update."
  //     });
  //     return;
  //   }
  //   const fields = Object.keys(req.body);
  //   const values = Object.values(req.body);
  //   con.execute(
  //     `UPDATE actor SET ${fields.join(' = ?, ')} = ? WHERE actor_id = ?;`,
  //     [...values, req.params.id],
  //     (err, dbres) => {
  //       if(err) {
  //         console.log('DAO ERROR', err);
  //         res.send('ERROR updating record');
  //         return;
  //       }
  //       res.send(`changed: ${dbres.changedRows}`);
  //     }
  //   );
  // },
}

export {
  ItemDao,
};
