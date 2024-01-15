interface ButtonProps {
  type: 'primary' | 'secondary';
  link?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default ButtonProps;
