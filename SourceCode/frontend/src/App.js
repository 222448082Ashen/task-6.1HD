import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import FindQuestions from './pages/FindQuestions';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import PricingPlans from './pages/PricingPlans';
import Payment from './pages/Payment';
import ForgotPassword from './pages/ForgotPassword';
import Tutorials from './pages/Tutorials';
import SecureMessaging from './pages/SecureMessaging';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-post" element={<PrivateRoute element={<Post />} />} />
          <Route path="/find-questions" element={<PrivateRoute element={<FindQuestions />} />} />
          <Route path="/plans" element={<PricingPlans />} />
          <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/messaging" element={<PrivateRoute element={<SecureMessaging />} />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;