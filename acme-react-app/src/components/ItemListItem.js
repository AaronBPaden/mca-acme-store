import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import FloatingButton from './FloatingButton.js';
import { getQuantity, addToCart, removeFromCart } from '../util/PostAPI';

const ItemListItem = (props) => {
  const navigate = useNavigate();
  let [ cookies ] = useCookies(['acme-user']);
  let [ active, setActive ] = useState(false);

  let [ quantity, setQuantity ] = useState(0);
  let [ quantityToggle, setQuantityToggle ] = useState(true);
  /* Refresh the quantity */
  useEffect(() => {
    getQuantity(cookies, props.item.store_item_id)
      .then(res => setQuantity(res))
      .catch(e => console.log(e));
  }, [quantityToggle, cookies, props.item.store_item_id] );

  const handleAddButton = (event) => {
    addToCart(cookies, props.item.store_item_id)
      .then(res => setQuantityToggle(prev => !prev))
      .catch(e => console.log(e));
  }
  const checkActive = (event) => {
    if (!cookies['acme-user'] || !cookies['acme-user'].username || !cookies['acme-user'].token) {
      setActive(false);
    } else {
      setActive(true);
    }
  }

  const navigateToItem = (event) => {
    if (event.target.classList.contains("floating-button")) return;
      navigate(`/item/${props.item.store_item_id}`);
  }

  const handleRemoveButton = () => {
    removeFromCart(cookies, props.item.store_item_id)
      .then(res => setQuantityToggle(prev => !prev))
      .catch(e => console.log(e));
  }

  return(
    <li>
        <div onMouseOver={checkActive} onMouseLeave={() => setActive(false)} onClick={navigateToItem} className="items-list-item">
          <FloatingButton className="floating-button-pushable floating-button-add" visible={active} handleClick={handleAddButton} content="+" />
          <FloatingButton className="floating-button-pushable floating-button-remove" visible={active} handleClick={handleRemoveButton} content="-" />
          <FloatingButton className="floating-button-quantity" visible={quantity > 0} handleClick={null} content={quantity} />
          <img
            className="img-fluid items-list-img"
            src={
              props.item.img_path
                ? props.item.img_path
                : "https://via.placeholder.com/640x480"
            }
            alt="{props.item.name}"
          />
          <h3 className="items-list-name">{props.item.name}</h3>
        </div>
    </li>
  );
}

export default ItemListItem;
