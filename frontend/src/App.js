import './App.css';
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignUpAndLogin from './pages/SignUpAndLogin';
import Home from './components/Home';
import CartDetails from './components/CartDetail';
import ReviewList from './components/ReviewList';
import UserProfile from './components/UserProfile';
import About from './components/About';
import Contact from './components/Contact';

function Layout({ children }) {
  const location = useLocation();
  const isSignUpAndLoginPage = location.pathname === "/SignUpAndLogin";

  return (
    <>
      {!isSignUpAndLoginPage && <Navbar />}
      {children}
      {!isSignUpAndLoginPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>

            {/* Route for login/sign-up page */}
            <Route
              path="/SignUpAndLogin"
              element={<SignUpAndLogin />}
            />

            {/* Route for home page */}
            <Route
              path="/"
              element={<Home />}
            />
            <Route path="/product/:productId" element={<CartDetails />} />
            
            <Route path="/ReviewList" element={<ReviewList />} />
            <Route path='/me' element={<UserProfile/>}/>
            <Route path='/About' element={<About/>}/>
            <Route path='/Contact' element={<Contact/>}/>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
