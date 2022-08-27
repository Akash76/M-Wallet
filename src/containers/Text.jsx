import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import os from 'os';

function Text() {
  const [data, setData] = useState(null)

  React.useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setData(window.getData())
  }

  return (
    <>
    <Link to="/test">
        <div
          style={{ color: '#fff', textDecoration: 'none'}}
        >Text</div>
    </Link>
    {data && <p>{data}</p>}
  </>
  )
}

export default Text