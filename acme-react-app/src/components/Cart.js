import { getUserCart } from '../util/postAPI';
import { useState, useEffect } from 'react';
import Carousel from './Carousel';
const Cart = (props) => {
  let [ sliderList, setSliderList ] = useState([]);
  useEffect(() => {
    getUserCart(props.cookies)
      .then(res => setSliderList(res))
      .catch(e => console.log(e));
  }, [props.cookies]);
  return(
    <>
      {sliderList.length > 0 &&
      <div className="cart section-header">
        <h2>Cart</h2>
        <Carousel sliderList={sliderList} />
      </div>
      }
    </>
  );
}

export default Cart;
