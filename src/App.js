
import { Routes,Route } from 'react-router-dom';
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
import ForgorPassword from './pages/ForgorPassword';


function App() {

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
    <div className="flex flex-col min-h-screen justify-content items-center overflow-x-hidden overflow-y-hidden">
      {/* <Navbar />  */}
      <Routes>

        <Route path='/' element={<HomePage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />

        
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


        <Route 
          path='/doctor/book-appointment/:doctorId'
          element={<BookingPage/>}
        />
        <Route path='/doctors' element={<DoctorList/>}></Route>

        <Route path='forgot-password' element={
          <ForgorPassword/> 
        }/>

      </Routes>
    </div>
  );
}

export default App;
