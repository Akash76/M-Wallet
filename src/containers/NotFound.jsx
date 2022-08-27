import React from 'react';
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <div>Page Not Found</div>
      <Link to="/text">
        back
      </Link>
    </>
  );
}

export default NotFound;
