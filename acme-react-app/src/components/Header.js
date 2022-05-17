import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

import ApiConfig from '../config/ApiConfig';

const Header = (props) => {
  const [cookies, removeCookie] = useCookies(['acme-user']);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (!cookies['acme-user'] || !cookies['acme-user'].username || !cookies['acme-user'].token) return;
    axios.post(`${ApiConfig.URL}/user/validate`,
      cookies['acme-user']
    ).then(res => {
      setAuthenticated(true);
    }).catch(error => {
      removeCookie('acme-user');
    });
  }, [cookies, removeCookie]);
  return props.width <= 1366 ? <MobileHeader authenticated={authenticated} /> : <DesktopHeader authenticated={authenticated} />;
}

export default Header;
