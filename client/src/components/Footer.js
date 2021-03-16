import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer>
      
      <div><Link to="/topics">Add a new topic</Link></div>
      <div><Link to="/addresource">Add a resource</Link></div>
      <div><Link to="/">Homepage</Link></div>


    </footer>
  )
}


