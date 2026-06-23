import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import { appStore } from './store/app.store';
import Home from './pages/Home';
import Toaster from './components/toaster/toaster';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Toaster/>
        <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route path='/' element={ <Home/> }></Route>
            <Route path='/login' element={ <Login/> }></Route>
          </Route>
        </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
