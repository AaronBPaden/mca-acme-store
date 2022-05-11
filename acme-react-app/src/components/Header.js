import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
const Header = (props) => {
  return props.width <= 1366 ? <MobileHeader /> : <DesktopHeader />;
}

export default Header;
