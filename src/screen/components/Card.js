import React from "react";
import "./Card.css";

const Card = ({ info, icon }) => {
  return (
    <div className="info-card">
      <div className="info-content">
        {info?.length === 1
          ? info.map((item, index) => {
              return (
                <div key={index}>
                  <div className="latlong-label">{item.label}</div>
                  <div className="latlong-value">{item.value}</div>
                </div>
              );
            })
          : info.map((item, index) => {
              return (
                <div key={index} className="info-item">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              );
            })}
      </div>
      {icon && <div className="card-icon">{icon}</div>}
    </div>
  );
};

export default Card;
