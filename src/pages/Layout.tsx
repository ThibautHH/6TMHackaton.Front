import React, { FunctionComponent } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-secondary-100 file:h-fit min-h-screen flex flex-col relative'>
      <div className='flex flex-col flex-1 z-[2] items-center'>
        <div className='max-w-6xl px-5 py-10 w-full'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
