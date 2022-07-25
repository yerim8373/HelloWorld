import React from 'react';
import "./dropdown.css";
import { FaAngleDown } from "react-icons/fa";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <input id="dropdown" type="checkbox" />
        <label className="dropdownLabel" htmlFor="dropdown">
          <div>CSS</div>
          <FaAngleDown className="caretIcon" />
        </label>
        <div className="content">
          <ul>
            <li>Class</li>
            <li>Selectors</li>
            <li>Media query</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
