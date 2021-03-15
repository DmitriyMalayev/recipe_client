import React from "react";
const CuisineListItem = ({ cuisine }) => {
  return (
    <li className="" key={cuisine.id}>
      {cuisine.name}
    </li>
  );
};

export default CuisineListItem;
