
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const adminAccess = localStorage.getItem('admin_access');
      const adminAuthenticated = localStorage.getItem('admin_authenticated');
      
      const hasAccess = adminAccess === 'true' || adminAuthenticated === 'true';
      setIsAuthenticated(hasAccess);
      
      if (requireAuth && !hasAccess) {
        navigate('/admin-access');
      } else if (!requireAuth && hasAccess) {
        navigate('/admin');
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [navigate, requireAuth]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
