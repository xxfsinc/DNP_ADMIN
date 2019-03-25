import React from "react";
import { NavLink } from "react-router-dom";
import newTabProps from "utils/newTabProps";
// Items
import { sidenavItems } from "components/navbar/navbarItems";
// styles
import "./home.css";

const SURVEY_LINK = "https://goo.gl/forms/DSy1J1OlQGpdyhD22";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Welcome to DAppNode</h1>
          <p className="lead">
            If you have just finished the installation, please help the team
            telling us how it went in the survey below
          </p>
          <p className="lead">
            <a
              className="btn btn-dappnode"
              href={SURVEY_LINK}
              role="button"
              {...newTabProps}
            >
              Fill survey
            </a>
          </p>
        </div>

        <div className="home-links">
          {sidenavItems.map(item => (
            <NavLink to={item.href} key={item.href}>
              <button
                type="button"
                className="btn btn-outline-dark btn-lg btn-block"
              >
                <div className="text-center" style={{ opacity: 0.6 }}>
                  <item.icon scale={2} />
                </div>
                <div style={{ fontSize: "16px" }}>{item.name}</div>
              </button>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}
