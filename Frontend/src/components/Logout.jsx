import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {

  const logoutUser = async () => {
    try {
      await signOut(auth);
      alert("User Logged Out");
      console.log("User logged out");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <button
      onClick={logoutUser}
      style={{
        padding: "8px 16px",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
