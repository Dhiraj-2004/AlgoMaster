import axios from "axios";
import { useEffect, useState } from "react";

const useAmcatData = (amcatID) => {
  const [amcatData, setAmcatData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!amcatData && amcatID) {

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const fetchAmcatData = async () => {
        try {
            
          setLoading(true);
          const response = await axios.get(`${backendUrl}/api/amcat/user`, {
            params: { amcatID },
          });
          setAmcatData(response.data.user);

        } catch (error) {
          setError(error.response?.data?.error || "Failed to fetch AMCAT data");
        } finally {
          setLoading(false);
        }
      };

      fetchAmcatData();
    }
  }, [amcatID, amcatData]);

  return { amcatData, error, loading };
};

export default useAmcatData;
