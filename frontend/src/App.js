import './App.css';
import { ContextProvider } from './context/Context';
import { Router } from './router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Router />
        <ToastContainer autoClose={2000} closeOnClick />
      </div>
    </ContextProvider>
  );
}

export default App;
