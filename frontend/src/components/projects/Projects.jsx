import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProject from "./AddProject";



const Projects = (props) => {
    console.log(props)
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      const endpoint = "/projects";
      const response = await fetch("http://localhost:9999/api" + endpoint, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        setProjects(data);
      } else {
        navigate("/");
      } 
    };
    getProjects();
  }, [props.refresh]);

  console.log("projects:", projects);
  return (
    <section>
      <AddProject setRefresh ={props.setRefresh} userID = {props.userID}  />
      {projects.map((object, index) => {
        {console.log(object.projectName);}
        return <p key ={index}>{object.projectName}</p>;
      })}
    </section>
  );
};

export default Projects;
