import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#5e548e', 
    color: 'white',
    textAlign: 'center',
    padding: '10px 0 10px 0',
    fontSize: '16px', 
  };

  return (
    <header style={headerStyle}>
      <h3>MyTeam</h3>
    </header>
  );
};

export default Header;
