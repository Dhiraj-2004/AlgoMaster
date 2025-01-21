import axios from 'axios';
import { useState } from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent]=useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/user/forgotPass', { email });
            setMessage(response.data.message);
            setOtpSent(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error sending OTP');
        }
    };

    const handleChangeForgotPassword = async () => {
      try {
          const response = await axios.post('http://localhost:4000/api/user/changePassword', { 
            email,
            otp,
            password
          });
          setMessage(response.data.message);
          navigate("/");
      } catch (error) {
          setMessage(error.response?.data?.message || 'Error loging');
      }
  };

    return (
        <div className="items-center w-[90%] sm:max-w-96 m-auto mt-16 pt-3 text-sm space-y-4">
            <p className="prata-regular text-4xl">Forgot Password</p>
            <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            {otpSent && (
              <div className='space-y-4'>
                <InputField
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your OTP"
                /> 
                <InputField
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
              </div>
            )}
            <p onClick={() => { navigate("/login") }} className='cursor-pointer'>
                Back to login
            </p>

            <div className="flex justify-center mt-5">
              {otpSent ? (
                <button onClick={handleChangeForgotPassword}
                  className="bg-[#ff5757] rounded-[24px] px-8 py-2 text-white font-semibold"
                >Login</button>
              ) :
              <button
                onClick={handleForgotPassword}
                className="bg-[#ff5757] rounded-[24px] px-8 py-2 text-white font-semibold"
              >Send OTP</button>
              }
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
