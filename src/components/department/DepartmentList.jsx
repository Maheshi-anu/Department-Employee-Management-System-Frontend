import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDepartments, deleteDepartment } from '../../services/departmentService';
import AlertMessage from '../shared/AlertMessage';
import ConfirmDialog from '../shared/ConfirmDialog';
import LoadingSpinner from '../shared/LoadingSpinner';
import PageHeader from '../shared/PageHeader';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [confirm, setConfirm] = useState({ open: false, id: null, name: '' });

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to load departments' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDeleteClick = (dept) => {
    setConfirm({ open: true, id: dept.departmentId, name: dept.deptName });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDepartment(confirm.id);
      setAlert({ type: 'success', message: 'Department deleted successfully' });
      setConfirm({ open: false, id: null, name: '' });
      await fetchDepartments();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to delete department' });
      setConfirm({ open: false, id: null, name: '' });
    }
  };

  return (
    <div className="position-relative">
      <LoadingSpinner isLoading={loading} message="Loading departments..." />
      <PageHeader
        title="Departments"
        subtitle="Manage organizational departments and codes"
        action={
          <Link to="/departments/add" className="btn btn-success btn-action">
            <i className="bi bi-plus-lg me-2" />
            Add Department
          </Link>
        }
      />
      <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      <div className="card app-card border-0 shadow-sm">
        <div className="card-body p-0">
          {departments.length === 0 && !loading ? (
            <div className="empty-state text-center py-5">
              <i className="bi bi-diagram-3 display-4 text-muted" />
              <h5 className="mt-3">No departments yet</h5>
              <p className="text-muted">Create your first department to get started.</p>
              <Link to="/departments/add" className="btn btn-primary mt-2">
                Add Department
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 app-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.departmentId}>
                      <td>
                        <span className="badge bg-light text-dark border">#{dept.departmentId}</span>
                      </td>
                      <td>
                        <span className="fw-semibold text-primary">{dept.deptCode}</span>
                      </td>
                      <td>{dept.deptName}</td>
                      <td className="text-end">
                        <Link
                          to={`/departments/edit/${dept.departmentId}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          <i className="bi bi-pencil-square me-1" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(dept)}
                        >
                          <i className="bi bi-trash me-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ConfirmDialog
        isOpen={confirm.open}
        message={`Are you sure you want to delete "${confirm.name}"? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirm({ open: false, id: null, name: '' })}
      />
    </div>
  );
};

export default DepartmentList;
