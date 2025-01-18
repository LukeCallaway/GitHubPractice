import React, { useState, useEffect } from "react";


function Card({value, suit}) {

  return (
    <li>{value} of {suit}</li>
  );
};

export default Card;