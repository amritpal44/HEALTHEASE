
import { Routes,Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
// import Navbar from './components/Common/Navbar';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Category from './pages/Category';


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

        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>

        <Route path='/category' element={<Category/>}/>

      </Routes>
    </div>
  );
}

export default App;
