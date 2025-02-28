import { Navigate  } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  try {
    const decodedToken = jwtDecode(token);
    const userRol = decodedToken.userRol 

    if (!allowedRoles.includes(userRol)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (error) {
    console.error('Token inválido o expirado:', error);
    return <Navigate to="/login" />;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;