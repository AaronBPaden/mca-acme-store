const MobileHeader = () => {
  return(
    <header className="header header-dropdown">
      <nav className="dropdown category-nav">
        <button className="btn nav-dropdown-button dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          ACME Corporation
        </button>
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li><a className="dropdown-item" href="/">Home</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="/anvils">Anvils</a></li>
          <li><a className="dropdown-item" href="/encabulators">Encabulators</a></li>
          <li><a className="dropdown-item" href="/leisure">Leisure</a></li>
          <li><a className="dropdown-item" href="/miracle remedies">Miracle Remedies</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default MobileHeader;
