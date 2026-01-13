import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const LinkAdapter = ({ to, onClick, children, className = '', ...rest }) => {
  if (to) {
    const isExternal = /^https?:\/\//.test(to);

    if (isExternal) {
      return (
        <a href={to} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <RouterLink to={to} className={className} {...rest}>
        {children}
      </RouterLink>
    );
  }

  return (
    <button onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
};

<LinkAdapter
  to="/about"
  className={`px-4 py-2 rounded-lg transition-all`}
>
  About
</LinkAdapter>;
