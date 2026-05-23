import { Route, Routes } from 'react-router-dom';
import DepartmentForm from './components/department/DepartmentForm';
import DepartmentList from './components/department/DepartmentList';
import EmployeeForm from './components/employee/EmployeeForm';
import EmployeeList from './components/employee/EmployeeList';
import Navbar from './components/shared/Navbar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <div className="app-shell">
    <Navbar />
    <main className="app-main">
      <div className="container py-4 py-md-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/add" element={<DepartmentForm />} />
          <Route path="/departments/edit/:id" element={<DepartmentForm />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
    <footer className="app-footer text-center py-3">
      <small className="text-muted">Dept & Employee Management System</small>
    </footer>
  </div>
);

export default App;
