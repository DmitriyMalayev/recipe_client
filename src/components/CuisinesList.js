import React from "react";
import CuisineListItem from "./CuisineListItem";
let collage_title = "collage_title.png";
let collage = "collage.jpeg";

const CuisinesList = ({ cuisines }) => {
  return (
    <>
      <img
        className="w-full transform hover:scale-150 border-4 border-blue-500 shadow-lg"
        src={collage_title}
        alt={"title"}
      />
      <br />
      <img
        className="w-auto transform hover:scale-150 border-4 border-blue-500 shadow-lg"
        src={collage}
        alt={"collage"}
      />
      <ul>
        {cuisines.map((cuisine) => (
          <CuisineListItem key={cuisine.id} cuisine={cuisine.name} />
        ))}
      </ul>
    </>
  );
};

export default CuisinesList;
