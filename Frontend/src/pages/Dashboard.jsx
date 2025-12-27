import { auth } from "../firebase";
import logoutUser from "../components/Logout";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome Dashboard</h1>
      <p>{auth.currentUser?.email}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Dashboard;
