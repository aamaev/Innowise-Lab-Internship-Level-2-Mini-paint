import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Feed from './components/Feed';
import CreateImg from './components/CreateImg';

const App: React.FC = () => {
  return (
    <Routes>
        <Route path='/' 
               element={<AuthPage />}/>
        <Route path='/signin' 
               element={<AuthPage />} />
        <Route path='/signup' 
               element={<AuthPage />} />
        <Route path='/feed' 
               element={<Feed />} />
        <Route path='/create' 
               element={<CreateImg />} />
    </Routes>
  );
}

export default App;
