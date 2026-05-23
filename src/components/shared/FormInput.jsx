const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  required = false,
  options = [],
}) => {
  const inputId = `field-${name}`;
  const hasError = Boolean(error);

  const renderField = () => {
    if (type === 'select') {
      return (
        <select
          id={inputId}
          name={name}
          className={`form-select ${hasError ? 'is-invalid' : ''}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">Select department</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={inputId}
        name={name}
        type={type}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={disabled}
      />
    );
  };

  return (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label fw-semibold">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      {renderField()}
      {hasError && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default FormInput;
