import { Link } from 'react-router-dom';
const DesktopHeader = (props) => {
  return(
    <header className="header">
      <div className="slanted-title-container">
        <div className="title-div">
          <h1 className="title"><Link to="/">ACME Corporation</Link></h1>
        </div>
        <div className="slanted-border"></div>
      </div>
      <nav className="category-nav">
        <ul className="nav">
          <li className="nav-item"><Link className="category-nav-link nav-link" to="/anvil">Anvils</Link></li>
          <li className="nav-item"><Link className="category-nav-link nav-link" to="/encabulator">Encabulators</Link></li>
          <li className="nav-item"><Link className="category-nav-link nav-link" to="/leisure">Leisure</Link></li>
          <li className="nav-item"><Link className="category-nav-link nav-link" to="/medicine">Miracle Remedies</Link></li>
        </ul>
      </nav>
      {props.authenticated
        ? <Link className="btn checkout-button" to="/user">
          Profile
        </Link>
        : <Link className="btn checkout-button" to="/login">
          Register/Login
        </Link>
      }
    </header>
  );
};

export default DesktopHeader;
