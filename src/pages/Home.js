import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import HuePickerModified from "../components/HuePickerModified";
import convert from "color-convert/conversions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import PersonalSpotsHistory from "../components/PersonalSpotsHistory";
import GlobalSpotsHistory from "../components/GlobalSpotsHistory";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Personal", value: "1" },
    { name: "Global", value: "2" },
  ];

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  // TODO: store colors in global state, yet xyz
  const getDotColors = () => {
    let dot1 = document.getElementById("huePicker1").style.background;
    let dot2 = document.getElementById("huePicker2").style.background;
    let dot3 = document.getElementById("huePicker3").style.background;
    let dot4 = document.getElementById("huePicker4").style.background;
    let dot5 = document.getElementById("huePicker5").style.background;
    saveDotColors(dot1, dot2, dot3, dot4, dot5);
  };

  const saveDotColors = async (color1, color2, color3, color4, color5) => {
    try {
      const dateString =
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1).toString() +
        "-" +
        new Date().getDate().toString();
      // Saving or updating uniqueDates collection
      const dateCollectionRef = collection(db, "uniqueDates");
      const dateQuery = query(
        dateCollectionRef,
        where("date", "==", dateString)
      );
      const dateQuerySnapshot = await getDocs(dateQuery);
      if (dateQuerySnapshot.empty === true) {
        await addDoc(dateCollectionRef, { date: dateString });
      }

      // Saving or updating dotHistory collection
      const collectionRef = collection(db, "dotHistory");
      const q = query(
        collectionRef,
        where("date", "==", dateString),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty === true) {
        await addDoc(collectionRef, {
          uid: user.uid,
          date: dateString,
          color1: color1,
          color2: color2,
          color3: color3,
          color4: color4,
          color5: color5,
        });
      } else {
        await updateDoc(doc(db, "dotHistory/" + querySnapshot.docs[0].id), {
          uid: user.uid,
          date: dateString,
          color1: color1,
          color2: color2,
          color3: color3,
          color4: color4,
          color5: color5,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div>
      <Header />
      <div className="pageWrapperShortened">
        <div className="pageCentered2">
          <div className="huePickers">
            <HuePickerModified
              id="huePicker1"
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              id="huePicker2"
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              id="huePicker3"
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              id="huePicker4"
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              id="huePicker5"
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
          </div>
          <div className="confirmEntry">
            <Button
              className="confirmButton"
              onClick={getDotColors}
              variant="dark"
            >
              Confirm
            </Button>
          </div>
          <div className="toggleButtons">
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  className="radioToggle"
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-success" : "outline-danger"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <div className="dotHistory">
            {radioValue == 1 ? (
              <div className="PersonalSpotHistory">
                <PersonalSpotsHistory />
              </div>
            ) : (
              <div className="GlobalSpotHistory">
                <GlobalSpotsHistory />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
