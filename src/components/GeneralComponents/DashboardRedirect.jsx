import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DashboardRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log("inside Dashboard redirect", token)

    if (token) { 
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role;
        console.log(userRole)

        // Redirect based on role
        switch (userRole) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'kitchen':
            navigate('/kitchen-dashboard');
            break;
          case 'billing':
            navigate('/billing-dashboard');
            break;
          default:

            // Redirect to login if role is unknown or token doesn't include a role
            alert("You are not Authorized")
            navigate('/login');

        }
      } catch (error) {
        // If token is invalid or jwtDecode fails
        console.error('Error decoding token:', error);
        alert("You are not Authorized")
        navigate('/login');
      }
    } else {
      // Redirect to login if no token found
      navigate('/login');
    }
  }, [navigate]);

  return null; // This component does not render anything
};


export default DashboardRedirect