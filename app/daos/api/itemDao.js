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

}

export {
  ItemDao,
};
