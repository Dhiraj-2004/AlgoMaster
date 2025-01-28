import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../component/InputField';
import Dropdown from '../component/Dropdown';
import AuthSwitch from '../component/AuthSwitch';
import SubmitButton from '../component/SubmitButton';
import { ToastContainer, toast } from 'react-toastify';


const LoginForm = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState(null);
  const [roll, setRoll] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [college, setCollege] = useState(null);
  const [year, setYear] = useState(null);
  const navigate = useNavigate();

  const colleges = [
    'Select your college',
    'Pune Institute of Computer Technology (PICT)',
    'Vishwakarma Institute of Technology (VIT)',
    'College of Engineering Pune (COEP)',
    'MIT-WPU',
    'Dr. D. Y. Patil Institute Of Technology, Pune',
    'Army Institute of Technology',
    'None'
  ];

  const years = [
    'Select studying year',
    'First Year',
    'Second Year',
    'Third Year',
    'Last Year',
  ];

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (currentState === 'Sign Up') {
      try {
        const response = await axios.post('http://localhost:4000/api/user/signup', {
          name,
          roll,
          email,
          password,
          college,
          year,
        });
        localStorage.setItem('token', response.data.token);
        toast.success('Sign Up successful!');
        setTimeout(() => {
          navigate('/add');
        }, 2000);
      } catch (error) {
        console.error('Error in signup:', error);
        toast.error('Failed to sign up. Try again!');
      }
    } else {
      try {

        const response = await axios.post('http://localhost:4000/api/user/login', {
          email,
          password,
        });
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('Failed to login!');

      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-5 gap-4 mb-24"
    >
      <div className="inline-flex items-center gap-2 mb-6 mt-10">
        <p className="text-4xl font-semibold text-pretty text-blue-500">{currentState}</p>
      </div>

      {currentState === 'Sign Up' && (
        <>
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            label="Name"
          />
          <InputField
            type="text"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="Roll Number"
            label="Roll"
          />
          <Dropdown
            options={colleges}
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            label="Select Collage"
          />
          <Dropdown
            options={years}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Select Year"
          />
        </>
      )}

      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        label="Email"
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={currentState === 'Login' ? 'Password' : 'Set Password'}
        label="Password"
      />

      <AuthSwitch currentState={currentState} setCurrentState={setCurrentState} />
      <SubmitButton currentState={currentState} />

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
    </form>
  );
};

export default LoginForm;
