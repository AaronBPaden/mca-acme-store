import {useState, useEffect} from 'react';

import { getAPI } from '../util/getAPI';
import Carousel from '../components/Carousel';

const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    getAPI('item/top', res => setSliderList(res));
  }, []);
  return (
    <main className="main">
      <section className="main-section about-box">
        <p>
          <span className="about-heading">Here at ACME Corp. we believe in excellence!</span> Since 1920 we have remained commited to the highest quality widgets.
          Our anvils, explosive encabulators and other scientfic gizmos will be delivered to your door. Customer satisfaction is guaranteed!
        </p>
      </section>
      <section className="main-section top-picks-box">
        <h2 className="section-header">Top Picks</h2>

        <Carousel sliderList={sliderList} />
      </section>
    </main>
  );
}

export default Home;
