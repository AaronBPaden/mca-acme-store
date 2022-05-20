import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import FloatingButton from './FloatingButton.js';
import ApiConfig from '../config/ApiConfig';

const ItemListItem = (props) => {
  const navigate = useNavigate();
  let [ cookies ] = useCookies(['acme-user']);
  let [ active, setActive ] = useState(false);
  let [ quantity, setQuantity ] = useState(0);
  const addToCart = (event) => {
    axios.post(`${ApiConfig.URL}/user/addCartItem`, {
      username: cookies['acme-user'].username,
      token: cookies['acme-user'].token,
      itemId: props.item.store_item_id
    }).catch(error => {
      let msg = error.response.data ? error.response.data.message || error.message : error.message;
      console.log(msg);
    });
  }
  useEffect(() => {
    if (!cookies['acme-user'] || !cookies['acme-user'].username || !cookies['acme-user'].token) return;
    axios.post(`${ApiConfig.URL}/user/getItemQuantity`, {
      username: cookies['acme-user'].username,
      token: cookies['acme-user'].token,
      itemId: props.item.store_item_id
    }).then(res => {
      setQuantity(res.data.quantity);
    }).catch(error => {
      if (!error.response) {
        console.log(error);
        return;
      }
      let msg = error.response.data ? error.response.data.message || error.message : error.message;
      console.log(msg);
    });
  });
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

  const removeFromCart = () => {
  }

  return(
    <li>
        <div onMouseOver={checkActive} onMouseLeave={() => setActive(false)} onClick={navigateToItem} className="items-list-item">
          <FloatingButton className="floating-button-pushable floating-button-add" visible={active} handleClick={addToCart} content="+" />
          <FloatingButton className="floating-button-pushable floating-button-remove" visible={active} handleClick={removeFromCart} content="-" />
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
