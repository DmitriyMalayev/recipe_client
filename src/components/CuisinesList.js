import React from "react";
import CuisineListItem from "./CuisineListItem";

const CuisinesList = ({ cuisines }) => {
  return (
    <>
      <h1>Cuisines List</h1>
      <ul>
        {cuisines.map((cuisine) => (
          <CuisineListItem key={cuisine.id} cuisine={cuisine} />
        ))}
      </ul>
    </>
  );
};

export default CuisinesList;