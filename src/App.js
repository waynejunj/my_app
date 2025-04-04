import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import Getproducts from './components/Getproducts';
import UploadProduct from './components/Uploadproduct';
import Makepayment from './components/Makepayment';
import Splash from './components/Splash'; // Import the splash screen
import { useState } from 'react'; // Import useState

function App() {
  const [showSplash, setShowSplash] = useState(true); // Add state for splash screen
  
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Show splash screen or main app
  if (showSplash) {
    return <Splash onFinish={handleSplashFinish} duration={5000} />;
  }

  // Your existing app code
  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <header className='App-header d-flex justify-content-between align-items-center'>
          <h1 className='d-flex align-items-center mb-0'>
            <span className='imgspan pe-3'>
              <img src="/assets/images/basket.jpg" alt="" className='headerimg'/>
            </span>
            SokoGarden-Buy & Sell Online
          </h1>
          
          {/* Navigation buttons on the right */}
          <Nav className="flex-row">
            <Nav.Item className="px-2">
              <Link to="/signin" className="nav-link">Sign In</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </Nav.Item>
          </Nav>
        </header>

        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/' element={<Getproducts/>}/>
          <Route path='/uploadproduct' element={<UploadProduct/>}/>
          <Route path='/payment' element={<Makepayment/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;