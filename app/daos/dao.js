"use strict";
import daoCommon from './daoCommon.js';
import { ItemDao } from './api/itemDao.js';

const idao = new ItemDao();

export {
  idao as ItemDao,
}
