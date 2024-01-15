interface ButtonProps {
  type: 'primary' | 'secondary' | 'invert';
  link?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default ButtonProps;
