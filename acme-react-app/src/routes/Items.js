import {useState, useEffect} from 'react';

import { getAPI } from '../util/getAPI';
import ItemList from '../components/ItemList';

const Items = (props) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    getAPI('item', setItemList);
  }, []);
  return (
    <main className="main">
      <ItemList
        sectionName="Anvils"
        itemList={itemList.filter(el => el.category === 'anvil')}
      />
      <ItemList
        sectionName="Encabulators"
        itemList={itemList.filter(el => el.category === 'encabulator')}
      />
      <ItemList
        sectionName="Leisure"
        itemList={itemList.filter(el => el.category === 'leisure')}
      />
      <ItemList
        sectionName="Miracle Remedies"
        itemList={itemList.filter(el => el.category === 'medicine')}
      />
    </main>
  )
}

export default Items;
