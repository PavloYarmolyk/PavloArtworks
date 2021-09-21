import React from 'react';
import { Link } from 'gatsby';

const linkStyles = {
  color: 'black',
  display: 'inline-block',
  margin: '0 0.5rem',
  padding: '0.25rem',
  textDecoration: 'none',
}
const activeLinkStyles = {
  color: '#994343',
  borderTop: '2px solid black',
  borderBottom: '2px solid black',
};

const NavLink = ({ children, to }) => (
  <Link className="nav-link" to={to} activeStyle={activeLinkStyles} style={linkStyles}>
    {children}
  </Link>
);

export default NavLink;
