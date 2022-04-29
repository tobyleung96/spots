import React from "react";

export function SpotsArray(props) {
  const spotsData = props.spotsData;
  return (
    <div className="spotsArray">
      {/* <div className="dateText"></div> */}
      {spotsData
        .filter((item, index) => index > 4)
        .map((dateText) => (
          <div className="dateText" key={dateText.toString()}>
            {dateText}
          </div>
        ))}
      {spotsData
        .filter((item, index) => index < 5)
        .map((bgColor) => (
          <div
            className="spot"
            style={{ backgroundColor: bgColor }}
            key={bgColor.toString()}
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
        <SpotsArray spotsData={spotArray} key={spotArray.toString()} />
      ))}
    </div>
  );
}
