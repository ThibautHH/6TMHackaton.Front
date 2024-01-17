import React, { FunctionComponent } from 'react';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  BoltIcon
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface CustomAlertProps {
  message?: string;
  type?: string;
  button?: string;
  title?: string;
  href?: string;
  buttonTitle?: string;
  className?: string;
}

const CustomAlert: FunctionComponent<CustomAlertProps> = ({
  message, type, button, title, href, buttonTitle, className
}) => {
  const [open, setOpen] = React.useState(true);
  let alertStyle = 'h-fit ';
  let buttonStyle = '';
  let icon: JSX.Element | null = null;
  const navigate = useNavigate();

  switch (type) {
  case 'warning':
    alertStyle += 'bg-orange-500 text-white';
    buttonStyle += 'hover:bg-orange-450 bg-orange-600';
    icon = <ShieldExclamationIcon className='h-6 w-6' />;
    break;
  case 'info':
    alertStyle += 'bg-secondary-500 text-black-800';
    buttonStyle += 'hover:bg-secondary-450 bg-secondary-600';
    icon = <InformationCircleIcon className='h-6 w-6' />;
    break;
  case 'alert':
    alertStyle += 'bg-red-500 text-white';
    buttonStyle += 'hover:bg-red-450 bg-red-600';
    icon = <ExclamationTriangleIcon className='h-6 w-6' />;
    break;
  case 'success':
    alertStyle += 'bg-green-500 text-white';
    buttonStyle += 'hover:bg-green-450 bg-greeCheckCircleIconn-600';
    icon = <CheckCircleIcon className='h-6 w-6' />;
    break;
  case 'nitro':
    alertStyle += 'bg-booster-default text-white';
    buttonStyle += 'hover:bg-booster-dark bg-booster-light';
    icon = <BoltIcon className='h-6 w-6' />;
    break;
  default:
    break;
  }

  const handleAction = (button: string) => {
    switch (button) {
    case 'close':
      setOpen(false);
      break;
    case 'logout':
      navigate('/logout');
      break;
    default:
      break;
    }
  };

  return (
    <div className={className}>
      <div className={`${alertStyle} rounded-lg p-4 font-medium
      flex md:flex-row flex-col justify-between gap-1 ${open ? 'block' : 'hidden'}
      animate-fade-in`}>
        <div className='flex flex-row gap-2'>
          {icon && (
            <div className='shrink-0'>
              {icon}
            </div>
          )}
          <div>
            <h4>
              {title ? (<strong>{title}</strong>) : ''}
            </h4>
            <p>
              {message ? message : 'Something went wrong!'}
            </p>
          </div>
        </div>
        {button && (
          <button className={`transition-colors duration-150 ease-in-out
          font-medium py-2 px-7 rounded-md ${buttonStyle}`}
          onClick={() => handleAction(button)}>
            {buttonTitle ? buttonTitle :
              button.charAt(0).toUpperCase() + button.slice(1)}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomAlert;
