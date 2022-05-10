import { Splide, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

const Carousel = (props) => {
  return (
    <Splide aria-label="List of top products" options={{
      type: 'loop',
      autoWidth: true,
      gap: '1rem',
      pagination: false,
    }}>
      {props.sliderList.map((item, i) => {
        return(
          <SplideSlide key={i}>
            <a className="slider-link" href={`item/${item.store_item_id}`}>
              <div className="slider-box">
                <img className="slider-img img-fluid" src={item.img_path ? item.img_path : "https://via.placeholder.com/640x480"} alt={item.name} />
                <h3 className="slider-title">{item.name}</h3>
              </div>
            </a>
          </SplideSlide>
        );
      })}
    </Splide>
  )
}

export default Carousel;
