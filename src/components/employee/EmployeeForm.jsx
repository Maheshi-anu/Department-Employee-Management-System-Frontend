import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../../services/departmentService';
import { createEmployee, getEmployeeById, updateEmployee } from '../../services/employeeService';
import { calculateAge } from '../../utils/dateUtils';
import { validateEmployeeForm } from '../../utils/validators';
import AlertMessage from '../shared/AlertMessage';
import FormInput from '../shared/FormInput';
import LoadingSpinner from '../shared/LoadingSpinner';
import PageHeader from '../shared/PageHeader';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    salary: '',
    departmentId: '',
  });
  const [age, setAge] = useState('');
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const deptData = await getAllDepartments();
        setDepartments(deptData);
        if (isEdit) {
          const emp = await getEmployeeById(id);
          const dob = emp.dateOfBirth?.split('T')[0] || '';
          setForm({
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            dateOfBirth: dob,
            salary: String(emp.salary),
            departmentId: String(emp.departmentId),
          });
          setAge(String(emp.age ?? calculateAge(dob)));
        }
      } catch (err) {
        setAlert({ type: 'error', message: err.message || 'Failed to load data' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'dateOfBirth') {
        setAge(value ? String(calculateAge(value)) : '');
      }
      return updated;
    });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEmployeeForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        dateOfBirth: form.dateOfBirth,
        salary: Number(form.salary),
        departmentId: Number(form.departmentId),
      };
      if (isEdit) {
        await updateEmployee(id, payload);
        setAlert({ type: 'success', message: 'Employee updated successfully' });
      } else {
        await createEmployee(payload);
        setAlert({ type: 'success', message: 'Employee created successfully' });
      }
      setTimeout(() => navigate('/employees'), 600);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to save employee' });
    } finally {
      setSubmitting(false);
    }
  };

  const deptOptions = departments.map((d) => ({
    value: d.departmentId,
    label: `${d.deptCode} — ${d.deptName}`,
  }));

  return (
    <div className="position-relative">
      <LoadingSpinner isLoading={loading} message="Loading employee form..." />
      <PageHeader
        title={isEdit ? 'Edit Employee' : 'Add Employee'}
        subtitle={isEdit ? 'Update employee information' : 'Register a new employee'}
      />
      <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      <div className="row justify-content-center">
        <div className="col-xl-8">
          <div className="card app-card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              {departments.length === 0 && !loading && (
                <div className="alert alert-warning border-0 mb-4">
                  <i className="bi bi-info-circle me-2" />
                  Please create at least one department before adding employees.
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <FormInput
                      label="First Name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <FormInput
                      label="Last Name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required
                    />
                  </div>
                </div>
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="name@company.com"
                  required
                />
                <div className="row">
                  <div className="col-md-6">
                    <FormInput
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      error={errors.dateOfBirth}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <FormInput
                      label="Age"
                      name="age"
                      value={age}
                      onChange={() => {}}
                      disabled
                      placeholder="Auto-calculated"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormInput
                      label="Salary"
                      name="salary"
                      type="number"
                      value={form.salary}
                      onChange={handleChange}
                      error={errors.salary}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <FormInput
                      label="Department"
                      name="departmentId"
                      type="select"
                      value={form.departmentId}
                      onChange={handleChange}
                      error={errors.departmentId}
                      options={deptOptions}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-success px-4"
                    disabled={submitting || loading || departments.length === 0}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2" />
                        {isEdit ? 'Update' : 'Save'}
                      </>
                    )}
                  </button>
                  <button type="button" className="btn btn-light px-4" onClick={() => navigate('/employees')}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
