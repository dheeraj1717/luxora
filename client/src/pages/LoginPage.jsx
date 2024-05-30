import React, { useEffect } from 'react';
import Login from '../components/Login.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {

    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
