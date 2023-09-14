import React from 'react';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

interface Props {
  toggleSidebar: () => void;
}

const NavLinks = ({ toggleSidebar }: Props) => {
  return (
    <div className="nav-links">
      {links.map((link) => (
        <NavLink
          to={link.path}
          key={link.id}
          className={({ isActive }) =>
            isActive ? 'nav-lin active' : 'nav-link'
          }
          onClick={toggleSidebar}
          end
        >
          <span className="icon">{link.icon}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
