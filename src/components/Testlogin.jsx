import React from 'react'
import { useState } from 'react';
// import { useEffect } from 'react';
import cx from 'classnames';



function Testlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('button clicked');

    // Perform authentication here
  };


  return (
    
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
      <div className={cx('mb-4', 'flex', 'flex-col', 'items-center')}>
        <label
          htmlFor="username"
          className={cx('text-lg', 'text-gray-700')}
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className={cx('p-2', 'border', 'rounded-md')}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className={cx('mb-4', 'flex', 'flex-col', 'items-center')}>
        <label
          htmlFor="password"
          className={cx('text-lg', 'text-gray-700')}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className={cx('p-2', 'border', 'rounded-md')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button
        type="submit"
        className={cx('px-4', 'py-2', 'bg-blue-500', 'rounded-md', 'text-white')}
      >
        Sign In
      </button>
    </form>
    </div>
  )
}

export default Testlogin