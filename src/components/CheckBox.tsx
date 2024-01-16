import React, { FunctionComponent } from 'react';

interface CheckBoxProps {
  value: boolean;
  setValue: (value: boolean) => void;
  title: string;
}

const CheckBox: FunctionComponent<CheckBoxProps> = ({
  value, setValue, title
}) => {
  return (
    <div className='flex items-center mb-4'>
      <input id='default-checkbox' type='checkbox' value=''
        className='w-4 h-4 text-secondary-600 bg-black-100 border-black-300
        rounded focus:ring-secondary-500 focus:ring-2'/>
    </div>
  );
};

export default CheckBox;
