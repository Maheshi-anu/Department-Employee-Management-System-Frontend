import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from '../../services/departmentService';
import { validateDepartmentForm } from '../../utils/validators';
import AlertMessage from '../shared/AlertMessage';
import FormInput from '../shared/FormInput';
import LoadingSpinner from '../shared/LoadingSpinner';
import PageHeader from '../shared/PageHeader';

const DepartmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ deptCode: '', deptName: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getDepartmentById(id);
        setForm({ deptCode: data.deptCode, deptName: data.deptName });
      } catch (err) {
        setAlert({ type: 'error', message: err.message || 'Department not found' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateDepartmentForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        deptCode: form.deptCode.trim(),
        deptName: form.deptName.trim(),
      };
      if (isEdit) {
        await updateDepartment(id, payload);
        setAlert({ type: 'success', message: 'Department updated successfully' });
      } else {
        await createDepartment(payload);
        setAlert({ type: 'success', message: 'Department created successfully' });
      }
      setTimeout(() => navigate('/departments'), 600);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to save department' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="position-relative">
      <LoadingSpinner isLoading={loading} message="Loading department..." />
      <PageHeader
        title={isEdit ? 'Edit Department' : 'Add Department'}
        subtitle={isEdit ? 'Update department details' : 'Create a new department record'}
      />
      <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card app-card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit} noValidate>
                <FormInput
                  label="Department Code"
                  name="deptCode"
                  value={form.deptCode}
                  onChange={handleChange}
                  error={errors.deptCode}
                  placeholder="e.g. HR, IT, FIN"
                  required
                />
                <FormInput
                  label="Department Name"
                  name="deptName"
                  value={form.deptName}
                  onChange={handleChange}
                  error={errors.deptName}
                  placeholder="e.g. Human Resources"
                  required
                />
                <div className="d-flex gap-2 mt-4 pt-2">
                  <button type="submit" className="btn btn-success px-4" disabled={submitting || loading}>
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
                  <button type="button" className="btn btn-light px-4" onClick={() => navigate('/departments')}>
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

export default DepartmentForm;
