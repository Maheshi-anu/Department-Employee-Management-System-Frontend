const PageHeader = ({ title, subtitle, action }) => (
  <div className="page-header d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
    <div>
      <h1 className="page-title mb-1">{title}</h1>
      {subtitle && <p className="page-subtitle mb-0">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export default PageHeader;
