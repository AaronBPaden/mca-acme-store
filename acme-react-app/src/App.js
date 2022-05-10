import Header from './components/Header'
import Footer from './components/Footer'
function App(props) {
  return (
    <>
      <Header />
      {props.route}
      <Footer />
    </>
  );
}

export default App;
