import React from 'react'

export default function toAddLinks() {

  // if ok add to App.js and home

  return (
    <div>
      
      <div> <Link to="/topics">Add a topic</Link> </div>
      <div> <Link to="/resource">Add a resource</Link> </div>

    </div>
  )
}

export default toAddLinks