import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Formular from "../components/formular/Formular";
import Header from "../components/header/Header";





const Admin = () => {

    const [moebel, setMoebel] = useState([]); // hier stehen alle unsere Möbel drin
    const [userID, setUserID] = useState("");
    const [refresh, setRefresh] = useState(true); // wir nutzen diesenm state um bei einem neuen Freund ein fetch zu triggern und so die Seite zu aktuallisieren mit neuen Daten
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9999/api/moebel`)
            .then(res => res.json())
            .then(data => setMoebel(data))
            .catch(err => console.log(err))
    }, [refresh]) // refresh ist jetzt eine dependency vom useEffect, wenn refresh ein neuen wert bekommt wird useEffect ausgeführt
    console.log(moebel);


  //! USER Daten holen um an USER ID zu kommen
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



    //! Objekt finden dass den title hat, den man ins Input eingegeben hat
  const resultFilter = moebel?.filter(object => {
        //Prüfe ob userID von dem Objekt mit dem aktuellen User überinstimmt
      if (object.userID === user?._id) {

            //Falls ja, gib jedes Objekt das passt in ein Array (resultFilter)
            return object;
        } else {
            return false
        }
    })

console.log(resultFilter)


    //!Hier werden die Hinzugefügten Daten auch dargestellt
    return (
        <>
                <Header />
            <Formular setRefresh={setRefresh} userID ={user?._id} />
            <div className="eintrag">
                {resultFilter.map((moebel, index) => {
                    console.log(moebel);
                    return (
                        <div key={index}>
                            <p >{`${index + 1} ${moebel.title} ${moebel.size} ${moebel.description} ${moebel.price}`}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Admin