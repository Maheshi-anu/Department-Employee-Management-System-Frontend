const LoadingSpinner = ({ isLoading, message = 'Loading...' }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay d-flex flex-column align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3 text-muted fw-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
