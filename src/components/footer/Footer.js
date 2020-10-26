import React from 'react';

const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    Copyright &copy;
    {' '}
    {year}
    {' '}
    OpenTable - All Rights Reserved.
  </footer>
);

export default React.memo(Footer);
