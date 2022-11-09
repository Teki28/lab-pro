import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/routes/home/home';
import Navigation from './components/routes/navigation/navigation';
import Test from './components/routes/tttest/test';
import Rat from './components/routes/rat/rat';
import { AuthGuard } from './components/auth-guard';



function App () {
  return (
    <AuthGuard>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='test' element={<Test />} />
          <Route path='rat' element={<Rat />} />
        </Route>
      </Routes>
    </AuthGuard>

  );
}

export default App;
