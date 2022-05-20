import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import { getAPI } from '../util/getAPI';
import Error404 from './Error404';

const SingleItem = () => {
  const params = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => {
    getAPI(`item/${params.itemId}`, setItem);
  }, [params.itemId]);
  if (!item) {
    return <Error404 />
  }
  let paragraphs = item.description.split('\n\n');
  let smallparagraphs = item.smalltext ? item.smalltext.split('\n\n') : [];
  return(
    <main className="main">
      <section className="main-section item-content">
        <div className="item-description">
          <h2 className="section-header">{item.name}</h2>
          <div className="item-info-box">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            {smallparagraphs.map((p, i) => <p key={i}><small className="item-smalltext">{p}</small></p>)}
          </div>
        </div>
        <img className="img-fluid single-item-img" src={item.img_path ? item.img_path : "https://via.placeholder.com/1024x768"} alt={item.name} />
      </section>
      <section className="checkout-button-section">
        <button className="btn checkout-button">Add to Checkout</button>
      </section>
    </main>
  );
}

export default SingleItem;
