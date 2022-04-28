import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import SpotsArrays from "./SpotsArraysWrapper";

export default function PersonalSpotsHistory() {
  const [user, loading, error] = useAuthState(auth);
  const [personalSpots, setPersonalSpots] = useState([]);
  const [isLoadingQuery, setIsLoadingQuery] = useState(false);

  const fetchPersonalSpotsHistory = async () => {
    try {
      const q = query(
        collection(db, "dotHistory"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty == false) {
        querySnapshot.docs.forEach((item) => {
          //   item.data() = {date: '2022-4-27', color3: 'rgb(77, 255, 0)', color5: 'rgb(255, 157, 0)', color4: 'rgb(17, 0, 255)', color1: 'rgb(0, 34, 255)', …}
          // const date = item.data().date;
          const color1 = item.data().color1;
          const color2 = item.data().color2;
          const color3 = item.data().color3;
          const color4 = item.data().color4;
          const color5 = item.data().color5;
          setPersonalSpots((personalSpots) => [
            ...personalSpots,
            [color1, color2, color3, color4, color5],
          ]);
          setIsLoadingQuery(true);
        });
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchPersonalSpotsHistory();
  }, [user, loading]);

  return (
    <div className="SpotsHistory">
      {isLoadingQuery ? (
        <SpotsArrays spotsData={personalSpots} />
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
