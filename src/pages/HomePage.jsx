import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <section className="hero-section text-center mb-5">
      <span className="hero-badge">Workforce</span>
      <h1 className="hero-title mt-3 mb-3">
        Department & Employee
        <br />
        <span className="text-primary">Management System</span>
      </h1>
    </section>
    <div className="row g-4">
      <div className="col-md-6">
        <div className="card feature-card h-100 border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="feature-icon bg-primary-subtle text-primary">
              <i className="bi bi-diagram-3" />
            </div>
            <h3 className="mt-4 mb-2">Departments</h3>
            <p className="text-muted mb-4">
              Information about departments including code, name, and ID. View and manage your
              organization&apos;s department structure in one place.
            </p>
            <Link to="/departments" className="btn btn-primary">
              Manage Departments
              <i className="bi bi-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card feature-card h-100 border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="feature-icon bg-success-subtle text-success">
              <i className="bi bi-people" />
            </div>
            <h3 className="mt-4 mb-2">Employees</h3>
            <p className="text-muted mb-4">
              Employee profiles with name, email, date of birth, age, salary, and department details.
              Browse and filter staff records by department.
            </p>
            <Link to="/employees" className="btn btn-success">
              Manage Employees
              <i className="bi bi-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
