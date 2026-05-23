import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg app-navbar sticky-top">
    <div className="container">
      <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
        <span className="brand-icon">
          <i className="bi bi-building-fill-gear" />
        </span>
        <span>
          <span className="brand-title">Workforce</span>
          <span className="brand-subtitle d-block">Dept & Employee Hub</span>
        </span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav ms-auto gap-lg-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" end>
              <i className="bi bi-house-door me-1" />
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/departments">
              <i className="bi bi-diagram-3 me-1" />
              Departments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/employees">
              <i className="bi bi-people me-1" />
              Employees
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
