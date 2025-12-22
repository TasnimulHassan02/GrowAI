import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLabelers } from "../api/fetchLabeler";

export const useLabelers = () => {
  const [labelers, setLabelers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getLabelers(token);
        setLabelers(data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error("Failed to fetch labelers", error);
        }
      }
    };

    fetch();
  }, [navigate]);

  return { labelers };
};
