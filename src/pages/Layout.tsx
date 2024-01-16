import React, { FunctionComponent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-secondary-100 file:h-fit min-h-screen flex flex-col relative'>
      <Header />
      <div className='flex flex-col flex-1 z-[2] items-center mt-28'>
        <div className='max-w-6xl px-5 py-10 w-full'>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
