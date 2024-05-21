import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token');
  return token ? children : <Navigate to="/Login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

