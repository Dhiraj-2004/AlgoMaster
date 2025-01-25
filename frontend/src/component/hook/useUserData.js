import axios from "axios";
import { useEffect, useState } from "react";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:4000/api/user/userdata", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          setError(error.response?.data?.msg || "An error occurred");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }
  }, [userData]); 

  return { userData, error, loading };
};

export default useUserData;
