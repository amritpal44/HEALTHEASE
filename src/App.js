
import { Routes,Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Navbar from './components/Common/Navbar';
import { useEffect } from 'react'

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
    <div className="flex flex-col w-screen min-h-screen justify-content items-center overflow-x-hidden">
      <Navbar /> 
      <Routes>

        <Route path='/' element={<HomePage/>} />

      </Routes>
    </div>
  );
}

export default App;
