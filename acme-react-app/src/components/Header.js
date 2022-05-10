const Header = () => {
  return(
    <header className="header">
      <div className="slanted-title-container">
        <div className="title-div">
          <h1 className="title"><a href="/">ACME Corporation</a></h1>
        </div>
        <div className="slanted-border"></div>
      </div>
      <nav className="category-nav">
        <ul className="nav">
          <li className="nav-item"><a className="category-nav-link nav-link" href="/anvils">Anvils</a></li>
          <li className="nav-item"><a className="category-nav-link nav-link" href="/encabulators">Encabulators</a></li>
          <li className="nav-item"><a className="category-nav-link nav-link" href="/leisure">Leisure</a></li>
          <li className="nav-item"><a className="category-nav-link nav-link" href="/miracle remedies">Miracle Remedies</a></li>
        </ul>
      </nav>
      <button className="btn checkout-button">
        Register/Login
      </button>
    </header>
  );
}

export default Header;
