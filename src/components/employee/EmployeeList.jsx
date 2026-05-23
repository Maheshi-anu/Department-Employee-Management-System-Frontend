import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDepartments } from '../../services/departmentService';
import { deleteEmployee, getAllEmployees } from '../../services/employeeService';
import { calculateAge } from '../../utils/dateUtils';
import { formatCurrency, formatDate } from '../../utils/formatters';
import AlertMessage from '../shared/AlertMessage';
import ConfirmDialog from '../shared/ConfirmDialog';
import LoadingSpinner from '../shared/LoadingSpinner';
import PageHeader from '../shared/PageHeader';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filterDeptId, setFilterDeptId] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [confirm, setConfirm] = useState({ open: false, id: null, name: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [empData, deptData] = await Promise.all([getAllEmployees(), getAllDepartments()]);
      setEmployees(empData);
      setDepartments(deptData);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to load employees' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!filterDeptId) return employees;
    return employees.filter((e) => String(e.departmentId) === String(filterDeptId));
  }, [employees, filterDeptId]);

  const handleDeleteClick = (emp) => {
    setConfirm({
      open: true,
      id: emp.employeeId,
      name: `${emp.firstName} ${emp.lastName}`,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployee(confirm.id);
      setAlert({ type: 'success', message: 'Employee deleted successfully' });
      setConfirm({ open: false, id: null, name: '' });
      await fetchData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to delete employee' });
      setConfirm({ open: false, id: null, name: '' });
    }
  };

  return (
    <div className="position-relative">
      <LoadingSpinner isLoading={loading} message="Loading employees..." />
      <PageHeader
        title="Employees"
        subtitle="Manage employee records, salaries, and department assignments"
        action={
          <Link to="/employees/add" className="btn btn-success btn-action">
            <i className="bi bi-person-plus me-2" />
            Add Employee
          </Link>
        }
      />
      <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      <div className="card app-card border-0 shadow-sm mb-4">
        <div className="card-body py-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label htmlFor="deptFilter" className="form-label fw-semibold mb-1">
                Filter by Department
              </label>
              <select
                id="deptFilter"
                className="form-select"
                value={filterDeptId}
                onChange={(e) => setFilterDeptId(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentId}>
                    {d.deptCode} — {d.deptName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-8 text-md-end">
              <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? 's' : ''} shown
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card app-card border-0 shadow-sm">
        <div className="card-body p-0">
          {filteredEmployees.length === 0 && !loading ? (
            <div className="empty-state text-center py-5">
              <i className="bi bi-people display-4 text-muted" />
              <h5 className="mt-3">No employees found</h5>
              <p className="text-muted">Add a new employee or adjust your filter.</p>
              <Link to="/employees/add" className="btn btn-primary mt-2">
                Add Employee
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 app-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Department</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.employeeId}>
                      <td>
                        <span className="badge bg-light text-dark border">#{emp.employeeId}</span>
                      </td>
                      <td className="fw-semibold">
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td>
                        <a href={`mailto:${emp.email}`} className="text-decoration-none">
                          {emp.email}
                        </a>
                      </td>
                      <td>{formatDate(emp.dateOfBirth)}</td>
                      <td>
                        <span className="badge bg-info-subtle text-info-emphasis">
                          {emp.age ?? calculateAge(emp.dateOfBirth?.split('T')[0])} yrs
                        </span>
                      </td>
                      <td className="fw-medium">{formatCurrency(emp.salary)}</td>
                      <td>
                        <span className="dept-pill">{emp.departmentName}</span>
                      </td>
                      <td className="text-end">
                        <Link
                          to={`/employees/edit/${emp.employeeId}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          <i className="bi bi-pencil-square me-1" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(emp)}
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
        message={`Are you sure you want to delete "${confirm.name}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirm({ open: false, id: null, name: '' })}
      />
    </div>
  );
};

export default EmployeeList;
