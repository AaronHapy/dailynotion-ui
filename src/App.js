import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {clearToast} from './redux/slices/toastSlice'
import GlobalToast from './components/GlobalToast';

function App() {

  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {

    const timeout = setTimeout(() => {

      dispatch(clearToast());

    }, 3000);


    return () => clearTimeout(timeout);

  }, [toast.showToast, toast.toastMessage, toast.toastType, dispatch])

  return (
    <div className="App">
      <Header />
      <GlobalToast showToast={toast.showToast} message={toast.toastMessage} type={toast.toastType} />
      <Outlet />
    </div>
  );
}

export default App;
