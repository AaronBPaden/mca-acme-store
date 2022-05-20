import {useState, useEffect} from 'react';
import { getAPI } from '../util/getAPI';
import ItemList from '../components/ItemList';
const Category = (props) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    getAPI(`item/${props.category}`, (res) => Array.isArray(res) ? setItemList(res) : setItemList([res]));
  }, [props.category]);
  return (
    <main className="main">
      <ItemList
        sectionName={props.sectionName}
        itemList={itemList}
      />
    </main>
  );
}

export default Category;
