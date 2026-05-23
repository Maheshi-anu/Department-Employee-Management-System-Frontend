export const validateRequired = (value, fieldName) => {
  if (!value || !String(value).trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMaxLength = (value, max, fieldName) => {
  if (value && String(value).length > max) {
    return `${fieldName} must not exceed ${max} characters`;
  }
  return null;
};

export const validateAlphanumeric = (value, fieldName) => {
  if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
    return `${fieldName} must be alphanumeric`;
  }
  return null;
};

export const validateEmail = (value) => {
  if (!value || !String(value).trim()) {
    return 'Email is required';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address';
  }
  return null;
};

export const validateMinAge = (dob, minAge = 18) => {
  if (!dob) {
    return 'Date of Birth is required';
  }
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) {
    return 'Date of Birth is required';
  }
  const today = new Date();
  if (birthDate >= today) {
    return 'Date of Birth must be in the past';
  }
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  if (age < minAge) {
    return `Employee must be at least ${minAge} years old`;
  }
  return null;
};

export const validatePositiveNumber = (value, fieldName) => {
  if (value === '' || value === null || value === undefined) {
    return `${fieldName} is required`;
  }
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) {
    return `${fieldName} must be greater than zero`;
  }
  return null;
};

export const validateDepartmentForm = (form) => {
  const errors = {};
  const codeError =
    validateRequired(form.deptCode, 'Department Code') ||
    validateMaxLength(form.deptCode, 20, 'Department Code') ||
    validateAlphanumeric(form.deptCode, 'Department Code');
  const nameError =
    validateRequired(form.deptName, 'Department Name') ||
    validateMaxLength(form.deptName, 100, 'Department Name');
  if (codeError) errors.deptCode = codeError;
  if (nameError) errors.deptName = nameError;
  return errors;
};

export const validateEmployeeForm = (form) => {
  const errors = {};
  const firstNameError =
    validateRequired(form.firstName, 'First Name') ||
    validateMaxLength(form.firstName, 100, 'First Name');
  const lastNameError =
    validateRequired(form.lastName, 'Last Name') ||
    validateMaxLength(form.lastName, 100, 'Last Name');
  const emailError = validateEmail(form.email);
  const dobError = validateMinAge(form.dateOfBirth, 18);
  const salaryError = validatePositiveNumber(form.salary, 'Salary');
  if (firstNameError) errors.firstName = firstNameError;
  if (lastNameError) errors.lastName = lastNameError;
  if (emailError) errors.email = emailError;
  if (dobError) errors.dateOfBirth = dobError;
  if (salaryError) errors.salary = salaryError;
  if (!form.departmentId || form.departmentId === '') {
    errors.departmentId = 'Please select a department';
  }
  return errors;
};
