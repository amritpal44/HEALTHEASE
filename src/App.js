
import { Routes,Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
// import Navbar from './components/Common/Navbar';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Category from './pages/Category';
import VerifyEmail from './pages/VerifyEmail';
import BookingPage from './pages/BookingPage';
import DoctorList from './pages/DoctorList';

import PublicRoute from './components/Core/Auth/PublicRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import Settings from './components/Core/Dashboard/Settings';
import PrivateRoute from './components/Core/Auth/PrivateRoute';

import MyProfile from './components/Core/Dashboard/MyProfile';
import Error from './pages/Error';
import { useSelector } from 'react-redux';
// import { ACCOUNT_TYPE } from './utils/constants';
import Notification from './pages/Notification';
import Cart from './components/Core/Dashboard/Cart';
import Medicines from './pages/Medicines';
import Navbar from './components/Common/Navbar';
import UploadMedicine from './pages/UploadMedicine';
 

function App() {

  const {user} = useSelector( (state) => state.profile );

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('show');
  //       } 
  //       else {
  //         entry.target.classList.remove('show');
  //       }
  //     });
  //   });

  //   const hiddenElements = document.querySelectorAll('.hidden');
  //   hiddenElements.forEach((el) => observer.observe(el));

  //   return () => {
  //     hiddenElements.forEach((el) => observer.unobserve(el));
  //   };
  // }, []);


  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] min-w-[calc(100vw-3.5rem)] h-screen">

      <Navbar /> 
      <Routes>

        <Route path='/' element={<HomePage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />

        
        {/*********************  AUTH ROUTES  *********************/}
        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        } />
        <Route path='/signup' element={
          <PublicRoute>
            <Signup/>
          </PublicRoute>
        }/>
        <Route path='/verify-email' element={
          <PublicRoute>
            <VerifyEmail/>
          </PublicRoute>
        }/>


        <Route path='/category' element={<Category/>}/>



        {/*********************  BOOKING ROUTES  *********************/}
        {
          user?.accountType === "Patient" && (
            <>
              <Route 
                path='/doctor/book-appointment/:doctorId'
                element={<BookingPage/>}
              />
              <Route path='/doctors' element={<DoctorList/>}></Route>
            </>
          )
        }
        {
          user?.accountType === "Doctor" && (
            <>
              <Route 
                path='/appointment-request'
                element={<Notification />}
              />
            </>
          )
        }



        {/*********************  RESET PASSWORD ROUTES  *********************/}
        <Route path='/reset-password' element={
          <ForgotPassword/> 
        }/>
        <Route path='/update-password/:id' element={
          <UpdatePassword/>
        }/>


        {/**********************  DASHBOARD ROUTES  *********************/}
        <Route element={ <PrivateRoute> <Dashboard /> </PrivateRoute>}> 
          <Route path='/dashboard/settings' element={
            <PrivateRoute>
              <Settings/>
            </PrivateRoute>
          } />

          <Route path='/dashboard/my-profile' element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>    
          }/>

        </Route>


        {/*********************  MEDICINE UPLOAD ROUTES  *********************/}
        {
          user?.accountType === "Vendor" && (
            <Route path='/upload-medicine' element={<UploadMedicine/>} />
          )
        }

        <Route path='/cart' element={<Cart />}/>

        <Route path='/medicines' element={<Medicines/>} />

        <Route path='*' element={<Error/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
