import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddProject = (props) => {
    const [expand, setExpand] = useState(false);
    const [projectName, setProjectName] = useState('');
    const navigate = useNavigate();

    const sendProject = async () => {
      const endpoint = "/projects";
      const response = await fetch("http://localhost:9999/api" + endpoint, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ projectName, userID: props.userID }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        props.setRefresh((prev) => !prev);
      } else {
        navigate("/");
      }
    };
    return (
        <>
            <button onClick={() => setExpand(prev => !prev)}>{expand ? '-' : '+'}</button>
            {expand ?
                <>
                    <input onChange={(e) => setProjectName(e.target.value)} type="text" placeholder="Notitz hinzufügen" />
                    <button onClick={sendProject}>Projekt anlegen</button>
                </> : null

            }

        </>

    )
}

export default AddProject