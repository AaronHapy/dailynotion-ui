import React, {useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';

const GlobalToast = ({showToast, message, type}) => {

    useEffect(() => {

        if(showToast) {
            toast[type](message, {
                position: 'bottom-right'
            });
        }

    }, [showToast, message, type]);

  return (
    <ToastContainer />
  )
}

export default GlobalToast