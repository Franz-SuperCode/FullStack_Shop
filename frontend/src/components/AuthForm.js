import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const AuthForm = (props) => {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate();

  const sendAuthentification = async () => {


    let data = { email, password, name };

    // Base64 encode the profile picture and add it to the data object
    if (profilePicture) {
      const reader = new FileReader();
      reader.readAsDataURL(profilePicture);
      reader.onload = () => {
        data.profilePicture = reader.result;
        sendData(data);
      };
      reader.onerror = (error) => {
        console.error("Error:", error);
        sendData(data);
      };
    } else {
      sendData(data);
    }
  };

  const sendData = async (data) => {
    const baseUrl = "http://localhost:9999/api";
    const endPoint = register ? "/register" : "/login";
    const response = await fetch(baseUrl + endPoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.ok) register ? setRegister(false) : navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="brand-logo"></div>
      <div className="brand-title">Hotel Shop</div>

      <div className="inputs">
        <label>EMAIL</label>
        <input
          type="email"
          placeholder="z.B. batman@gotham.de"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>PASSWORT</label>
        <input
          type="password"
          placeholder="sicheres Passwort"
          onChange={(e) => setPassword(e.target.value)}
        />

        {register && (
          <input
            type="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {register && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        )}

        <button onClick={sendAuthentification}>
          {register ? "Registrieren" : "Login"}
        </button>

        <p className="text_acc" onClick={() => setRegister((prev) => !prev)}>
          {register ? "Account vorhanden?" : "Noch keinen Account?"}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
