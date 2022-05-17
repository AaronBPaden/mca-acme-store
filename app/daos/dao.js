import { ItemDao } from './api/itemDao.js';
import { UserDao } from './api/userDao.js';

const idao = new ItemDao();
const udao = new UserDao();

export {
  idao as ItemDao,
  udao as UserDao,
}
