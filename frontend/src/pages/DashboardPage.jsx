import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Projects from "../components/projects/Projects";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userDaten = async () => {
      const baseUrl = "http://localhost:9999/api";
      const endpoint = "/user";
      const response = await fetch(baseUrl + endpoint, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        navigate("/");
      }
    };
    userDaten();
  }, [refresh]);

  return (
    <main>
      <h1>DashBoard</h1>
      {user && <p>E-Mail: {user.email}</p>}

      {user && <p>User ID: {user._id}</p>}
      <Projects setRefresh={setRefresh} refresh={refresh} userID ={user?._id} />
    </main>
  );
};

export default DashboardPage;
