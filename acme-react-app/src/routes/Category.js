import {useState, useEffect} from 'react';
import GetAPI from '../util/GetAPI';
import ItemList from '../components/ItemList';
const Category = (props) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    GetAPI({url: props.category, callback: setItemList});
  }, [props.category]);
  return (
    <main class="main">
      <ItemList
        sectionName={props.sectionName}
        itemList={itemList}
      />
    </main>
  );
}

export default Category;
