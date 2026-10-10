import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', to, ...props }) {
  const className = `btn btn-${variant}`;

  if (to) {
    return <Link to={to} className={className} {...props}>{children}</Link>;
  }
  return <button className={className} {...props}>{children}</button>;
}