import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";
import SpotsArrays from "./SpotsArraysWrapper";

export default function PersonalSpotsHistory() {
  const [user, loading, error] = useAuthState(auth);
  const [personalSpots, setPersonalSpots] = useState([]);
  const [isLoadingQuery, setIsLoadingQuery] = useState(false);

  const fetchPersonalSpotsHistory = async () => {
    try {
      const q = query(
        collection(db, "dotHistory"),
        orderBy("date", "desc"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty == false) {
        querySnapshot.docs.forEach((item) => {
          const date = item.data().date;
          const color1 = item.data().color1;
          const color2 = item.data().color2;
          const color3 = item.data().color3;
          const color4 = item.data().color4;
          const color5 = item.data().color5;
          setPersonalSpots((personalSpots) => [
            ...personalSpots,
            [color1, color2, color3, color4, color5, date],
          ]);
          setIsLoadingQuery(true);
        });
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchPersonalSpotsHistory().then(
      console.log("personalSpots: ", personalSpots)
    );
  }, [user, loading]);

  return (
    <div className="SpotsHistory">
      {isLoadingQuery ? (
        <SpotsArrays spotsData={personalSpots} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
