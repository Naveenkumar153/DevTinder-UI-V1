import { useState } from 'react';
import './App.css';
import NavBar from './components/navbar/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
    <BrowserRouter basename='/'>
     <Routes>
       <Route path='/' element={<div>Base</div>}></Route>
       <Route path='/login' element={ <div>Login</div> }></Route>
     </Routes>
     <header>
       <NavBar/>
     </header>
     <main>

     </main>
     <footer>

     </footer>
    </BrowserRouter>
    </>
  )
}

export default App
