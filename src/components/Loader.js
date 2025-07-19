import './style.css';

function Loader() {
  return (
    <div className="d-lg-flex justify-content-lg-center">
      <div className="loader-container text-center">
        <div className="pulse"></div>
        <div className="loader">
          <svg className="loader-icon" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
            <path d="M25,10 L25,15 M40,25 L35,25 M25,40 L25,35 M10,25 L15,25" strokeWidth="4" stroke="#3498db" strokeLinecap="round"></path>
            <path d="M25,20 L30,30 L20,30 Z"></path>
          </svg>
        </div>
        <div className="loader-text text-warning">OnDeveloping<span>...</span></div>
      </div>
    </div>
  );
}

export default Loader;
