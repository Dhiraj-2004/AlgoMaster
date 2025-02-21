import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputField from "../component/InputField";
import Dropdown from "../component/Dropdown";
import AuthSwitch from "../component/AuthSwitch";
import SubmitButton from "../component/SubmitButton";
import { ToastContainer, toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const LoginForm = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    registeredID: "",
    username: "",
    email: "",
    password: "",
    department: "Select your Department",
    year: "Select studying year",
  });

  const [usernameStatus, setUsernameStatus] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  const navigate = useNavigate();

  const departmentOptions = [
    "Select your Department",
    "COMPUTER ENGINEERING",
    "ELECTRONICS AND TELECOMMUNICATION",
    "INFORMATION TECHNOLOGY",
    "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE",
    "ELECTRONICS AND COMPUTER",
    "None",
  ];

  const yearOptions = ["Select studying year", "First Year", "Second Year", "Third Year", "Forth Year"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // cheack username
  useEffect(() => {
    if (formData.username.length < 3) {
      setUsernameStatus("");
      return;
    }
    let isMounted = true;

    const checkUsername = async () => {
      setCheckingUsername(true);
      try {
        const response = await axios.get(`${backendUrl}/api/user/check-username/${formData.username}`);
        if (isMounted) {
          setUsernameStatus(response.data.msg)
        }
      } catch (error) {
        if (isMounted) {
          if (error.response) {
            if (error.response) {
              if (error.response.status === 400) {
                setUsernameStatus(error.response.data.msg);
              }
              else {
                setUsernameStatus("Server error. Please try again.");
              }
            }
            else {
              setUsernameStatus("Network error. Please check your connection.");
            }
          }
        }
      } finally {
        if (isMounted) {
          setCheckingUsername(false);
        }
      }
    };

    const debounceTimeout = setTimeout(checkUsername, 500);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [formData.username]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const url = currentState === "Sign Up" ? "/api/user/signup" : "/api/user/login";
      const response = await axios.post(`${backendUrl}${url}`, formData);

      localStorage.setItem("token", response.data.token);
      toast.success(`${currentState} successful!`);

      setTimeout(() => {
        navigate(currentState === "Sign Up" ? "/add" : "/");
      }, 2000);
    } catch (error) {
      toast.error(`Failed to ${currentState.toLowerCase()}! Try again.`);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="manrope-regular flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-5 gap-4 mb-24"
    >
      <div className="inline-flex items-center gap-2 mb-6 mt-10">
        <p className="rajdhani-bold text-4xl font-semibold text-blue-500">{currentState}</p>
      </div>

      {currentState === "Sign Up" && (
        <>
          <div className="w-full">
            <InputField name="username" value={formData.username} onChange={handleChange} placeholder="Username" label="Username" />
            {checkingUsername ? (
              <p className="text-blue-500 text-sm animate-pulse">Checking...</p>
            ) : (
              <p className={`text-sm ${usernameStatus === "Username is available" ? "text-green-500" : "text-red-500"}`}>
                {usernameStatus}
              </p>)}
          </div>

          <InputField
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            label="Name"
          />
          <InputField
            name="roll"
            value={formData.roll}
            onChange={handleChange}
            placeholder="Roll Number"
            label="Roll"
          />
          <InputField
            name="registeredID"
            value={formData.registeredID}
            onChange={handleChange}
            placeholder="Registered ID"
            label="Registered ID" />
          <Dropdown
            name="department"
            options={departmentOptions}
            value={formData.department}
            onChange={handleChange}
            label="Select Department"
          />
          <Dropdown
            name="year"
            options={yearOptions}
            value={formData.year}
            onChange={handleChange}
            label="Select Year"
          />
        </>
      )}

      <InputField
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        label="Email"
      />
      <InputField
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        label="Password"
      />

      <AuthSwitch
        currentState={currentState}
        setCurrentState={setCurrentState}
      />
      <SubmitButton currentState={currentState} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme="dark"
      />
    </form>
  );
};

export default LoginForm;
