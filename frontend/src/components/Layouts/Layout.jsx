import React from 'react';


function Layout({ children }) {
  return (
    
    <div>
      {/* Header */}
      <header>
        {/* Your header content here */}
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer>
        {/* Your footer content here */}
      </footer>
    </div>
  );
}

export default Layout;
