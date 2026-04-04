import './css/admin-home.css';

const Adminhome = () => {
  return (
    <div className='home-main'>
      {/* <h2>Welcome Username</h2> */}
      <div className='home-content'>

        <img src="/logo2.png" alt="Admin Dashboard" className='home-img' />
        <h1>CineNest <br></br><span>Organize, track, and explore your movie collection effortlessly.</span></h1>
      </div>
      <div className='home-footer'>
        <div className='home-footer-content'>
          <h3>Add Movies</h3>
          <p>Easily add and organize your favorite movies in one place.</p>
        </div>

        <div className='home-footer-content'>
          <h3>Track Watchlist</h3>
          <p>Keep track of movies you want to watch and never miss them.</p>
        </div>

        <div className='home-footer-content'>
          <h3>Rate & Review</h3>
          <p>Give ratings and write reviews for every movie you watch.</p>
        </div>

        <div className='home-footer-content'>
          <h3>Smart Search</h3>
          <p>Quickly find movies using powerful search and filters.</p>
        </div>
      </div>
    </div>
  )
}

export default Adminhome