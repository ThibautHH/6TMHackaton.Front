import React from 'react';
import { Employee } from '../utils/types/';
import logo from '../assets/6tm_logo.jpeg';
import { useNavigate } from 'react-router-dom';

const employeeCard: React.FC<{employee: Employee, id: number | undefined }> = ({
  employee, id
}) => {
  const navigate = useNavigate();

  return (
    <div className='relative group w-fit h-80' onClick={() => {
      navigate(`/list/${id}`);
    }}>
      <div className='bg-secondary-500 pl-2 pb-2 rounded-lg absolute w-full h-full
      -left-2 -bottom-2 -z-10 transition-all'/>
      <div
        className='w-52 rounded-lg overflow-hidden cursor-pointer transition-all
        z-40 relative h-full border-2 border-secondary-500 group-hover:scale-102'
      >
        {employee.professionalPicture && employee.casualPicture ? (
          <>
            <img
              src={employee.professionalPicture}
              alt={employee.name}
              className='group-hover:hidden flex mb-5'
              loading='lazy'
            />
            <img
              src={employee.casualPicture}
              alt={employee.name}
              className='group-hover:flex hidden mb-5'
              loading='lazy'
            />
          </>
        ) : (
          <div className='bg-secondary-500 w-full h-full flex items-center'>
            <img src={logo} alt='6TM' className='w-full h-fit' />
          </div>
        )}
        <div className='bg-white w-full text-black text-center
        font-medium h-fit p-2 absolute bottom-0'>
          <p className=''>{employee.firstName}</p>
          <p className='text-xs'>{employee.name}</p>
        </div>
      </div>
    </div>
  );
};

export default employeeCard;
