import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    console.log("inside Dashboard redirect", role)

    if (role) {
        
      try {
    
        console.log(role);
        // Redirect based on role
        switch (role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'patient':
            navigate('/home');
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


export default DashboardRedirection