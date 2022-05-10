import ItemListItem from './ItemListItem';

const ItemList = (props) => {
  return(
    <section className="items-section">
      <h2 className="section-header">{props.sectionName}</h2>
      <ul className="items-list">
        {props.itemList.map((el, i) => <ItemListItem
          key={i}
          item={el}
        />)}
      </ul>
    </section>
  )
}

export default ItemList;
