import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/appRoute";
import {NextUIProvider} from '@nextui-org/react'
import { Toaster } from "sonner";
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';


export default function App() {
  return (
    <Provider store={store}> 
    <NextUIProvider>
     < BrowserRouter >
       <Toaster position="top-center" />
       <AppRoute />
     </BrowserRouter>
    </NextUIProvider> 
    </Provider>
  )
}