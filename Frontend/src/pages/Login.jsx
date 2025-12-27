import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

const Login = () => {

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
      alert("Login Successful");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      {/* 👇 GOOGLE LOGIN BUTTON */}
      <button
        onClick={googleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
