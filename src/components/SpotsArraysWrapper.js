import React from "react";

export function SpotsArray(props) {
  const spotsData = props.spotsData;
  return (
    <div className="spotsArray">
      {spotsData
        .filter((item, index) => index > 4)
        .map((dateText) => (
          <div
            className="dateText"
            key={
              dateText.toString() +
              Math.floor(Math.random() * 999999999).toString()
            }
          >
            {dateText}
          </div>
        ))}
      {spotsData
        .filter((item, index) => index < 5)
        .map((bgColor) => (
          <div
            className="spot"
            style={{ backgroundColor: bgColor }}
            key={
              bgColor.toString() +
              Math.floor(Math.random() * 999999999).toString()
            }
          />
        ))}
    </div>
  );
}

// feed.filter((item, index) => index < 5).map((filteredItem)

export default function SpotsArraysWrapper(props) {
  // console.log("props.spotsData", props.spotsData);
  return (
    <div className="spotsArrays--wrapper">
      {props.spotsData.map((spotArray) => (
        <SpotsArray
          spotsData={spotArray}
          key={
            spotArray.toString() +
            Math.floor(Math.random() * 999999999).toString()
          }
        />
      ))}
    </div>
  );
}
