const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel, title = 'Confirm Delete' }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2" />
                {title}
              </h5>
              <button type="button" className="btn-close" onClick={onCancel} aria-label="Close" />
            </div>
            <div className="modal-body pt-2">
              <p className="mb-0 text-secondary">{message}</p>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-light px-4" onClick={onCancel}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger px-4" onClick={onConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default ConfirmDialog;
