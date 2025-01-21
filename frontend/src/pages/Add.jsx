import { useState } from "react";
import InputField from "../component/InputField";
import axios from "axios";

const Add = () => {
  const [leetUser, setLeetUser] = useState('');
  const [codeforcesUser, setCodeforcesUser] = useState('');
  const [codechefUser, setCodechefUser] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {};
      if (leetUser) payload.leetUser = leetUser;
      if (codeforcesUser) payload.codeforcesUser = codeforcesUser;
      if (codechefUser) payload.codechefUser = codechefUser;
      const response = await axios.post(
        "http://localhost:4000/api/user/insertuser",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User added successfully:', response.data);
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-16 gap-4 text-white">
      <InputField
        type="text"
        value={leetUser}
        onChange={(e) => setLeetUser(e.target.value)}
        placeholder="LeetCode Username"
      />

      <InputField
        type="text"
        value={codeforcesUser}
        onChange={(e) => setCodeforcesUser(e.target.value)}
        placeholder="Codeforces Username"
      />

      <InputField
        type="text"
        value={codechefUser}
        onChange={(e) => setCodechefUser(e.target.value)}
        placeholder="CodeChef Username"
      />

      <button
        className="bg-[#ff5757] rounded-[24px] text-black font-light px-8 py-2 mt-5"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default Add;
