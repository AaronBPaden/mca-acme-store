import { Link, Outlet } from 'react-router-dom';
const ItemListItem = (props) => {
  return(
    <li>
      <Link to={`/item/${props.item.store_item_id}`}>
        <div className="items-list-item">
          <img
            className="img-fluid items-list-img"
            src={
              props.item.img_path ?
                props.item.img_path
                : "https://via.placeholder.com/640x480"
            }
            alt="{props.item.name}"
          />
          <h3 class="items-list-name">{props.item.name}</h3>
        </div>
      </Link>
    </li>
  );
}

export default ItemListItem;
