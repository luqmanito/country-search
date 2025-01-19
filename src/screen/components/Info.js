import React from "react";
import "./Info.css";

const Info = ({ label, value, tooltipLabel, tooltipItems }) => {
  return (
    <div className="inline-item">
      <p className="inline-label">{label}</p>
      <p className="inline-value">{value}</p>
      <div className="tooltip-container">
        <a href="#" className="link">
          {tooltipItems.length} {tooltipLabel}
        </a>{" "}
        with this {label.toLowerCase()}
        <div className="tooltip">
          {tooltipItems.map((item, index) => (
            <p key={index}>{item.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
