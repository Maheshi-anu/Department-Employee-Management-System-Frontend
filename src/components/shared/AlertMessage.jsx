const AlertMessage = ({ type = 'success', message, onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';
  const alertClass = isSuccess ? 'alert-success' : 'alert-danger';
  const icon = isSuccess ? 'bi-check-circle-fill' : 'bi-x-circle-fill';

  return (
    <div className={`alert ${alertClass} alert-dismissible fade show shadow-sm border-0`} role="alert">
      <i className={`bi ${icon} me-2`} />
      {message}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
    </div>
  );
};

export default AlertMessage;
