import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../component/InputField';
import Dropdown from '../component/Dropdown';
import AuthSwitch from '../component/AuthSwitch';
import SubmitButton from '../component/SubmitButton';

const LoginForm = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const colleges = [
    'Select your college',
    'Pune Institute of Computer Technology (PICT)',
    'Vishwakarma Institute of Technology (VIT)',
    'College of Engineering Pune (COEP)',
    'MIT-WPU',
    'Dr. D. Y. Patil Institute Of Technology, Pune',
    'Army Institute of Technology',
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
          email,
          password,
          college,
          year,
        });
        alert('Account created');
        localStorage.setItem('token', response.data.token);
        navigate('/add');
      } catch (error) {
        console.error('Error in signup:', error);
        alert('Sign-up failed. Please try again.');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:4000/api/user/login', {
          email,
          password,
        });
        navigate("/")
        alert('Login successful');
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-16 gap-4"
    >
      <div className="inline-flex items-center gap-2 mb-6 mt-10">
        <p className="prata-regular text-4xl">{currentState}</p>
      </div>

      {currentState === 'Sign Up' && (
        <>
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <Dropdown
            options={colleges}
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
          <Dropdown
            options={years}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </>
      )}

      <InputField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={currentState === 'Login' ? 'Password' : 'Set Password'}
      />

      <AuthSwitch currentState={currentState} setCurrentState={setCurrentState} />
      <SubmitButton currentState={currentState} />
    </form>
  );
};

export default LoginForm;
