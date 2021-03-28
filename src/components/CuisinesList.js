import React from "react";
import CuisineListItem from "./CuisineListItem";

const CuisinesList = ({ cuisines }) => {
  return (
    <>
      <h1>Cuisines List</h1>
      <ul>
        {cuisines.map((cuisine) => (
          <CuisineListItem key={cuisine.id} cuisine={cuisine} />   //passing props so other components can use them if the 
        ))}
      </ul>
    </>
  );
};

export default CuisinesList;