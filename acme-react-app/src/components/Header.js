import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

import { validate } from '../util/PostAPI';

const Header = (props) => {
  let [cookies, removeCookie] = useCookies(['acme-user']);
  let [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    validate(cookies)
      .then(res => setAuthenticated(true))
      .catch(error => removeCookie('acme-user'));
  });
  return props.width <= 1366
    ? <MobileHeader authenticated={authenticated} />
    : <DesktopHeader authenticated={authenticated} username={authenticated ? cookies['acme-user'].username : null} />;
}

export default Header;
