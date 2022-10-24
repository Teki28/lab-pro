import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/routes/home/home';
import Navigation from './components/routes/navigation/navigation';
import Test from './components/routes/tttest/test';



function App () {
  return (

    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='test' element={<Test />} />
      </Route>
    </Routes>

  );
}

export default App;
