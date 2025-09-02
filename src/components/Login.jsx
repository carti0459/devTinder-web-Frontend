import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

// Reusable Input Field Component
const FormInput = ({ label, type, value, onChange, placeholder, id }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-gray-300 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="shadow appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 transition duration-300 ease-in-out"
    />
  </div>
);

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Error during sign up");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-4 font-sans">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700 transition-all duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          {isLoginForm ? "Welcome Back!" : "Join DevTinder!"}
        </h2>

        {!isLoginForm && (
          <>
            <FormInput
              id="firstName"
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
            <FormInput
              id="lastName"
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </>
        )}

        <FormInput
          id="emailId"
          label="Email ID"
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="your@example.com"
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />

        {error && <p className="text-red-400 text-center text-sm mb-6">{error}</p>}

        <div className="flex items-center justify-center mb-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-lg"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Log In" : "Sign Up"}
          </button>
        </div>

        <p
          className="text-center text-gray-400 text-sm cursor-pointer hover:text-blue-400 transition-colors duration-300 ease-in-out"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "New User? Create an Account!"
            : "Already have an account? Log In!"}
        </p>
      </div>
    </div>
  );
};

export default Login;