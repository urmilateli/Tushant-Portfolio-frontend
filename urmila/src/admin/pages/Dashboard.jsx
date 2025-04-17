import Navbar_admin from "../admin-components/Navbar_admin";
import './Dashboard_admin.css';

function Dashboard_admin() {
  return (
    <>
      <Navbar_admin />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome to the Admin Dashboard</h2>
        <p className="dashboard-description">
          Use the links above to manage your content efficiently.
        </p>
      </div>
    </>
  );
}

export default Dashboard_admin;
