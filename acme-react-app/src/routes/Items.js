import {useState, useEffect} from 'react';

import GetAPI from '../util/GetAPI';
import ItemList from '../components/ItemList';

const Items = (props) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    GetAPI({url: 'item', callback: setItemList});
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
