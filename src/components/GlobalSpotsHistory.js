import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";
import SpotsArrays from "./SpotsArraysWrapper";

export default function GlobalSpotsHistory() {
  const [user, loading, error] = useAuthState(auth);
  const [globalSpots, setGlobalSpots] = useState([]);
  const [isLoadingQuery, setIsLoadingQuery] = useState(false);

  const fetchUniqueDates = async () => {
    let uniqueDates = [];
    try {
      // get all the uniqueDates
      const q = query(collection(db, "uniqueDates"), orderBy("date", "desc"));
      const uniqueDatesDocs = await getDocs(q);
      uniqueDatesDocs.forEach((doc) => {
        uniqueDates = [...uniqueDates, doc.data().date];
      });
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
    return uniqueDates;
  };

  async function fetchDocsOfDate(uniqueDate) {
    let color1 = [[], [], []];
    let color2 = [[], [], []];
    let color3 = [[], [], []];
    let color4 = [[], [], []];
    let color5 = [[], [], []];
    try {
      const q = query(
        collection(db, "dotHistory"),
        where("date", "==", uniqueDate)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty == false) {
        querySnapshot.forEach((doc) => {
          const rgbArr1 = doc
            .data()
            .color1.substring(4, doc.data().color1.length - 1)
            .replace(/ /g, "")
            .split(",");
          color1[0] = [...color1[0], parseInt(rgbArr1[0])];
          color1[1] = [...color1[1], parseInt(rgbArr1[1])];
          color1[2] = [...color1[2], parseInt(rgbArr1[2])];
          const rgbArr2 = doc
            .data()
            .color2.substring(4, doc.data().color2.length - 1)
            .replace(/ /g, "")
            .split(",");
          color2[0] = [...color2[0], parseInt(rgbArr2[0])];
          color2[1] = [...color2[1], parseInt(rgbArr2[1])];
          color2[2] = [...color2[2], parseInt(rgbArr2[2])];
          const rgbArr3 = doc
            .data()
            .color3.substring(4, doc.data().color3.length - 1)
            .replace(/ /g, "")
            .split(",");
          color3[0] = [...color3[0], parseInt(rgbArr3[0])];
          color3[1] = [...color3[1], parseInt(rgbArr3[1])];
          color3[2] = [...color3[2], parseInt(rgbArr3[2])];
          const rgbArr4 = doc
            .data()
            .color4.substring(4, doc.data().color4.length - 1)
            .replace(/ /g, "")
            .split(",");
          color4[0] = [...color4[0], parseInt(rgbArr4[0])];
          color4[1] = [...color4[1], parseInt(rgbArr4[1])];
          color4[2] = [...color4[2], parseInt(rgbArr4[2])];
          const rgbArr5 = doc
            .data()
            .color5.substring(4, doc.data().color5.length - 1)
            .replace(/ /g, "")
            .split(",");
          color5[0] = [...color5[0], parseInt(rgbArr5[0])];
          color5[1] = [...color5[1], parseInt(rgbArr5[1])];
          color5[2] = [...color5[2], parseInt(rgbArr5[2])];
        });
      }
    } catch (err) {
      console.log(err);
    }
    const c1r = color1[0].reduce((a, b) => a + b, 0) / color1[0].length;
    const c1g = color1[1].reduce((a, b) => a + b, 0) / color1[1].length;
    const c1b = color1[2].reduce((a, b) => a + b, 0) / color1[2].length;
    const c2r = color2[0].reduce((a, b) => a + b, 0) / color2[0].length;
    const c2g = color2[1].reduce((a, b) => a + b, 0) / color2[1].length;
    const c2b = color2[2].reduce((a, b) => a + b, 0) / color2[2].length;
    const c3r = color3[0].reduce((a, b) => a + b, 0) / color3[0].length;
    const c3g = color3[1].reduce((a, b) => a + b, 0) / color3[1].length;
    const c3b = color3[2].reduce((a, b) => a + b, 0) / color3[2].length;
    const c4r = color4[0].reduce((a, b) => a + b, 0) / color4[0].length;
    const c4g = color4[1].reduce((a, b) => a + b, 0) / color4[1].length;
    const c4b = color4[2].reduce((a, b) => a + b, 0) / color4[2].length;
    const c5r = color5[0].reduce((a, b) => a + b, 0) / color5[0].length;
    const c5g = color5[1].reduce((a, b) => a + b, 0) / color5[1].length;
    const c5b = color5[2].reduce((a, b) => a + b, 0) / color5[2].length;

    const output = [
      "rgb(" +
        c1r.toString() +
        "," +
        c1g.toString() +
        "," +
        c1b.toString() +
        ")",
      "rgb(" +
        c2r.toString() +
        "," +
        c2g.toString() +
        "," +
        c2b.toString() +
        ")",
      "rgb(" +
        c3r.toString() +
        "," +
        c3g.toString() +
        "," +
        c3b.toString() +
        ")",
      "rgb(" +
        c4r.toString() +
        "," +
        c4g.toString() +
        "," +
        c4b.toString() +
        ")",
      "rgb(" +
        c5r.toString() +
        "," +
        c5g.toString() +
        "," +
        c5b.toString() +
        ")",
      uniqueDate,
    ];
    return output;
  }

  const fetchGlobalSpotsHistory = async () => {
    try {
      const uniqueDatesFetched = await fetchUniqueDates();
      await uniqueDatesFetched.forEach((date) => {
        fetchDocsOfDate(date).then((res) =>
          setGlobalSpots((globalSpots) => [...globalSpots, res])
        );
        setIsLoadingQuery(true);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchGlobalSpotsHistory().then(setIsLoadingQuery(true));
  }, [user, loading]);

  return (
    <div className="SpotsHistory">
      {isLoadingQuery ? (
        <SpotsArrays spotsData={globalSpots} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
