import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#f2e9f3',
    color: '#5e548e', 
    textAlign: 'center',
    padding: '20px 0',
    fontSize: '24px',
  };

  return (
    <header style={headerStyle}>
      <h1>MyTeam</h1>
    </header>
  );
};

export default Header;
