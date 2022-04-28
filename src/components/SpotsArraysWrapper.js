import React from "react";

export function SpotsArray(props) {
  const spotsData = props.spotsData;
  return (
    <div className="spotsArray">
      {spotsData.map((bgColor) => (
        <div
          className="spot"
          style={{ backgroundColor: bgColor }}
          key={bgColor.toString()}
        />
      ))}
    </div>
  );
}

export default function SpotsArraysWrapper(props) {
  console.log("props.spotsData", props.spotsData);
  return (
    <div className="spotsArrays--wrapper">
      {props.spotsData.map((spotArray) => (
        <SpotsArray spotsData={spotArray} key={spotArray.toString()} />
      ))}
    </div>
  );
}
