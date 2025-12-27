import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const signupUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created:", userCredential.user);
  } catch (error) {
    console.error(error.message);
  }
};
