
import './App.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminDashboard from './pages/AdminDashboard';
import KitchenDashboard from './pages/KitchenDashboard';
import BillingDashboard from './pages/BillingDashboard';
import { Route, Routes } from 'react-router-dom';
import Register from './components/LandingPage/Register';
import Login from './components/LandingPage/Login';
import DashboardRedirect from './components/GeneralComponents/DashboardRedirect';
import ProtectedRoute from './components/GeneralComponents/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import { ParallaxProvider } from 'react-scroll-parallax';
import Profile from './components/GeneralComponents/Profile';
const initialOptions = {
  "client-id": "AZLvAAQus0iWRmyQptYZtsOBh9PAGknJcgry6gfZgu3SeEzjsZ1n5_CEP8NCo7KO9n8p5mKFeWYFQ4w6",
  currency: "USD",
  intent: "capture",
};//paypal
function App() {

  return (
    <div className="App">

      <ParallaxProvider>
        <PayPalScriptProvider options={initialOptions}>
          <Routes>

            <Route
              path="/admin-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['billing', 'admin']}> {/* admin can also access billing */}
                  <BillingDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kitchen-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['kitchen', 'admin']}> {/* admin can also access kitchen */}
                  <KitchenDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/redirect" element={<DashboardRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </PayPalScriptProvider>
      </ParallaxProvider>
    </div>
  );
}

export default App;
