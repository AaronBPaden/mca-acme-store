import {useState, useEffect} from 'react';
import axios from 'axios';

import ApiConfig from '../config/ApiConfig';
import Carousel from '../components/Carousel';

const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    axios.get(`${ApiConfig.URL}/item/top`, {responseType: 'json' })
      .then(res => {
        console.log(res.data);
        setSliderList(res.data);
      })
      .catch(error => console.log(error))
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
