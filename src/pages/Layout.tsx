import React, { FunctionComponent } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-tertiary-600 h-fit min-h-screen flex flex-col relative'>
      <div className='flex flex-col flex-1 z-[2] items-center'>
        <div className='max-w-4xl px-5 py-10'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
