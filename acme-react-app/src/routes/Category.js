import {useState, useEffect} from 'react';
import GetAPI from '../util/GetAPI';
import ItemList from '../components/ItemList';
const Category = (props) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    GetAPI({url: `item/${props.category}`, callback: (res) => Array.isArray(res) ? setItemList(res) : setItemList([res])});
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
