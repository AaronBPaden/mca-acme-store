import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ApiConfig from '../config/ApiConfig';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import Cart from '../components/Cart';

const Profile = () => {
  const navigate = useNavigate();
  const {0: cookies, 1: removeCookie} = useCookies(['acme-user']);
  const [authenticated, setAuthenticated] = useState(false);

  /* Authenticate the session cookie. Remove and return to home on failure. */
  useEffect(() => {
    if (!cookies['acme-user'] || !cookies['acme-user'].username || !cookies['acme-user'].token) {
      navigate('/');
      return;
    }
    axios.post(`${ApiConfig.URL}/user/validate`,
      cookies['acme-user']
    ).then(res => {
      setAuthenticated(true);
    }).catch(error => {
      removeCookie('acme-user');
      navigate('/');
    });
  }, [navigate, cookies, removeCookie, setAuthenticated]);
  
  return(
    <main className="main">
      {authenticated &&
      <>
        <div className="profile-username-outer">
          <div className="profile-username-inner">
            <h2 className="profile-username-header">{cookies['acme-user'].username}</h2>
            <img
              className="img-fluid img-avatar"
              src={cookies['acme-user'].avatar || '/images/blank-avatar.png'}
              // decorative images should have an empty alt accordint to W3
              alt=""
            />
          </div>
        </div>
        <Cart cookie={cookies['acme-user']} />
      </>
      }
    </main>
  );
}

export default Profile;
