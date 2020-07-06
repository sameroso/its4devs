import { toast } from 'react-toastify';

function succesMessage(message) {
  toast.success(`${message}`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export default succesMessage;
