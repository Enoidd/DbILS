import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Home.css";

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: "url('./Leonardo_Home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="home-title">Italian Logistic Support</h1>
      <ul className="home-list">
        <li>
          <Link to="/database">
            <button className="home-button">Gestisci il Database</button>
          </Link>
        </li>
        <li>
          <Link to="/ilsiaf-mss">
            <button className="home-button">ILS IAF-MSS</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

