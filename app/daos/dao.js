"use strict";
import daoCommon from './daoCommon.js';
import { itemDao as idao } from './api/itemDao.js';

const itemDao = {
	...daoCommon,
	...idao
};

export {
	itemDao,
}
