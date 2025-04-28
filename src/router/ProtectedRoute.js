import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { auth } = useSelector(state => state.auth)
  
    if (!auth.id) {
      return <Navigate to="/" replace />
    }
  
    return children;
  };

export default ProtectedRoute