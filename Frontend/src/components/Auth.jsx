import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-6">{isLogin ? "Kisan Login" : "Kisan Register"}</h2>
        <input type="text" placeholder="Mobile Number" className="w-full p-3 mb-4 border rounded-xl" />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-xl" />
        <button className="w-full py-3 bg-green-600 text-white rounded-xl font-bold">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} className="mt-4 text-sm text-blue-500 cursor-pointer">
          {isLogin ? "New user? Register here" : "Already have account? Login"}
        </p>
      </div>
    </div>
  );
};
export default Auth;
