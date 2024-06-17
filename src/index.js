import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, createRoutesFromElements, Route ,RouterProvider} from 'react-router-dom';
import App from './App';
import Home from './screens/Home';
import Watch from './screens/Watch';
import Login from './screens/Login';
import Register from './screens/Register';
import {Provider} from 'react-redux';
import store from './redux/store';
import Channel from './screens/Channel';
import CreateChannel from './screens/CreateChannel';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/watch' element={<Watch />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/channel/:id' element={<Channel />} />
      <Route path='/create/channel' element={<CreateChannel />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
