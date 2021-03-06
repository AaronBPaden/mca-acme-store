import Header from './components/Header'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';
function App(props) {
  let [ dimensions, setDimensions ] = useState({width: window.innerWidth, height: window.innerHeight});
  useEffect(() => {
    window.addEventListener('resize', ev => {
      const { innerWidth: width, innerHeight: height } = window;
      setDimensions({width, height});
    });
  }, []);
  return (
    <>
      <Header width={dimensions.width} />
      {props.route}
      <Footer />
    </>
  );
}

export default App;
