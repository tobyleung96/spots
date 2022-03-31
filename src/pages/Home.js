import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";
import HuePickerModified from "../components/HuePickerModified";
import convert from "color-convert/conversions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export default function Home() {
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
      console.error(err);
      alert("An error occured while fetching user data");
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
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
            <HuePickerModified
              inputColor={convert.hsv.rgb([
                Math.floor(Math.random() * 255) + 1,
                100,
                100,
              ])}
            />
          </div>
          <div className="confirmEntry">
            <Button className="confirmButton" variant="dark">
              Confirm
            </Button>
          </div>
          <div className="toggleButtons">
            <Button className="toggleButton" variant="outline-secondary">
              Personal
            </Button>
            <Button className="toggleButton" variant="outline-secondary">
              World
            </Button>
          </div>
          <div className="dotHistory">
            <div className="PersonalSpotHistory"></div>
            <div className="GlobalSpotHistory"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
