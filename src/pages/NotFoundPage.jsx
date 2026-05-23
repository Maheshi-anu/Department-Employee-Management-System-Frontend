import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="text-center py-5">
    <div className="display-1 fw-bold text-muted opacity-25">404</div>
    <h2 className="mt-3 mb-2">Page not found</h2>
    <p className="text-muted mb-4">The page you are looking for does not exist or was moved.</p>
    <Link to="/" className="btn btn-primary px-4">
      <i className="bi bi-house-door me-2" />
      Back to Home
    </Link>
  </div>
);

export default NotFoundPage;
