import React from 'react'
import './css/navbar.css';

const Navbar = () => {
  return (
    <div className='navheader'>
        <div className='logo'>
            <img src="/logo.png" alt="CineNest Logo" className='logoimg'/>
        </div>
        <div className='navlinks'>
            <a href="/">Home</a>
            <a href="/movies">Movies</a>
            <a href="/tvshows">TV Shows</a>
            <a href="/mylist">My List</a>
        </div>
    </div>
  )
}

export default Navbar