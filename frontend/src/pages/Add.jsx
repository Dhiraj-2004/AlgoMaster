import { useState } from "react";
import InputField from "../component/InputField";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [leetcodeUser, setLeetUser] = useState('');
  const [codeforcesUser, setCodeforcesUser] = useState('');
  const [codechefUser, setCodechefUser] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const token = localStorage.getItem('token');
      const payload = {};
      if (leetcodeUser) payload.leetcodeUser = leetcodeUser;
      if (codeforcesUser) payload.codeforcesUser = codeforcesUser;
      if (codechefUser) payload.codechefUser = codechefUser;
      await axios.post(`${backendUrl}/api/user/insertuser`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Data Added successfully!');
      setTimeout(() => { navigate("/") }, 1000)
    } catch (error) {
      toast.error('Failed to Add!');
      console.error('Error inserting user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-16 gap-4 text-white">
      <InputField
        type="text"
        value={leetcodeUser}
        onChange={(e) => setLeetUser(e.target.value)}
        placeholder="LeetCode Username"
        label="LeetCode"
      />

      <InputField
        type="text"
        value={codeforcesUser}
        onChange={(e) => setCodeforcesUser(e.target.value)}
        placeholder="Codeforces Username"
        label="Codeforces"
      />

      <InputField
        type="text"
        value={codechefUser}
        onChange={(e) => setCodechefUser(e.target.value)}
        placeholder="CodeChef Username"
        label="CodeChef"
      />

      <button
        className="bg-red-500 rounded-[24px] text-white font-semibold px-8 py-2 mt-5 w-[40%] hover:bg-red-600"
        onClick={handleSubmit}
      >
        Submit
      </button>

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
}

export default Add;
