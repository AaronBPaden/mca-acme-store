import Dropdown from 'react-bootstrap/Dropdown';

const MobileHeader = () => {
  return(
    <header className="header header-dropdown">
      <Dropdown className="category-nav" id="dropdownMenuButton2">
        {/* react-bootstrap defaults to btn-primary here, so we'll clear out variant to remove it. */}
        <Dropdown.Toggle variant="" className="nav-dropdown-button">
          ACME Corporation
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className="dropdown-item" href="/">Home</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="dropdown-item" href="/anvil">Anvils</Dropdown.Item>
          <Dropdown.Item className="dropdown-item" href="/encabulator">Encabulators</Dropdown.Item>
          <Dropdown.Item className="dropdown-item" href="/leisure">Leisure</Dropdown.Item>
          <Dropdown.Item className="dropdown-item" href="/medicine">Miracle Remedies</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="dropdown-item" href="/login">Register/Login</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
}

export default MobileHeader;
