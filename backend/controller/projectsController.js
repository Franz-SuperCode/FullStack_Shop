import { ObjectId } from "mongodb"
import { getDb } from "../database/db.js"
import { createToken, verifyToken } from "../util/token.js"


export const getUserProjects = (req, res) => {
    //Ruft die Funktion "getDb" auf, um eine Verbindung zur MongoDB-Datenbank herzustellen
    getDb()
        //Wenn die Verbindung hergestellt wurde, sucht es die Sammlung "meineMoebel"
        .then(db => db.collection('project').find())
        //Wandelt pointer in ein Array um.
        .then(pointer => pointer.toArray())
        //Sendet das Array als Antwort des HTTP-Requests mit dem HTTP-Status-Code 200 
        .then(array => res.status(200).json(array))
};

export const addUserProject = async (req, res) => {
  const project = {
    projectName: req.body.projectName,
    userID: req.body.userID
  };

  const db = await getDb();
  const result = await db.collection("project").insertOne(project);
  console.log(result);
  res.status(200).end();
  console.log("Req.body: ",req.body);
  res.end();
};
