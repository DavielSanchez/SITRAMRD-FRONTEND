import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import { jwtDecode } from 'jwt-decode';
import { useBG, usePrimaryColors, useBGForButtons, useText, useIconColor } from '../ColorClass';

function renderNavItem(IconComponent, label, isActive, variant, onClick) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const bgColor = useBG(theme);
  const textColor = useText(theme);

  function getIconColor(variant, theme) {
    if (theme === 'dark') {
      return variant === 'chevronRight' ? 'white' : '#ff5353';
    } else {
      if (variant === 'chevron' || variant === 'chevronRight') return 'black';
      if (variant === 'gray') return 'gray';
      return '#6a62dc';
    }
  }

  return (
    <div
      className={`flex flex-col items-center cursor-pointer hover:text-[#6a62dc]`}
      onClick={onClick}>
      <IconComponent sx={{ color: getIconColor(variant, theme), fontSize: 24 }} />
      <span className={`${textColor}`}>{label}</span>
    </div>
  );
}

function NavBar({}) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const bgColor = useBG(theme);
  const textColor = useText(theme);

  return (
    <div
      className={`${textColor} ${bgColor} w-full xs:max-w-full h-[60px] text-xs shadow-md flex justify-around items-center fixed bottom-0 left-0 "}`}>
      {renderNavItem(HomeIcon, 'Inicio', false, 'default', () => navigate('/'))}
      {renderNavItem(AttachMoneyIcon, 'Billetera', false, 'default', () => navigate('/billetera'))}
      {renderNavItem(AccessTimeIcon, 'Actividad', false, 'default', () => navigate('/actividad'))}
      {renderNavItem(PersonOutlineIcon, 'Mi cuenta', true, 'default', () => navigate('/settings'))}
    </div>
  );
}

export default NavBar;
