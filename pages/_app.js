// pages/_app.js (or wherever your global layout is)

// import CustomCursor from '../components/CustomCursor';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={router.route}>
      
      {/* <CustomCursor /> */}
        <Component {...pageProps} />
      </PageTransition>
    </AnimatePresence>
  );
}

export default MyApp;
