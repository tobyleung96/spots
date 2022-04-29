import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      // console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    } else {
      fetchUserName();
    }
  }, [user, loading]);

  return (
    <div className="header">
      <div className="header--logo" onClick={useNavigate("/")}>
        S P O T S
      </div>
      {name == "" ? (
        <p></p>
      ) : (
        <div className="header--right">
          <div className="header--user">{name}</div>
          <button className="logOff--button" onClick={logout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
