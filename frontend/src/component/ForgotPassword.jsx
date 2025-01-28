import axios from 'axios';
import { useState } from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;



  const handleForgotPassword = async () => {
    try {
      await axios.post(`${backendUrl}/api/user/forgotPass`, { email });
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      console.log(error)
      toast.error('Failed to send OTP. Try again!');
    }
  };

  const handleChangeForgotPassword = async () => {
    try {
      await axios.post(`${backendUrl}/api/user/changePassword`, {
        email,
        otp,
        newPassword: password
      });
      toast.success('Password changed successfully!');
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error)
      toast.error('Failed to reset password. Try again!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[90%] sm:max-w-96 m-auto mt-16 pt-3 text-sm space-y-4">
      <p className="text-4xl font-semibold text-pretty text-blue-500 mb-10">Forgot Password</p>
      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        label="Email"
      />
      {otpSent && (
        <div className='space-y-4 w-full'>
          <InputField
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your OTP"
            label="OTP"
          />
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            label="New Password"
          />
        </div>
      )}
      <p onClick={() => { navigate("/login") }} className='cursor-pointer text-blue-400 mr-auto'>
        Back to login
      </p>

      <div className="flex justify-center mt-5">
        {otpSent ? (
          <button onClick={handleChangeForgotPassword}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 font-medium text-lg px-4 py-2 text-center dark:hover:bg-red-700 dark:focus:ring-red-800 w-32 h-12 rounded-2xl"
          >Login</button>
        ) :
          <button
            onClick={handleForgotPassword}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 font-medium text-lg px-4 py-2 text-center dark:hover:bg-red-700 dark:focus:ring-red-800 w-32 h-12 rounded-2xl"
          >Send OTP</button>
        }
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      ></ToastContainer>
    </div>
  );
};

export default ForgotPassword;
