/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { AuthProvider } from './hooks/AuthContext';
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (

    <div>
        <ThemeProvider>
        <AuthProvider>
        <Router />
        </AuthProvider>
        </ThemeProvider>
        <ToastContainer />
    </div>
    
  );
}
