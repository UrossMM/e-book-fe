import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const goToSIgnUp = () => {
    navigate("data");
  };

  return (
    <div id="sekcija">
      <div className="divButtonsLanding">
        <button className="buttonTextLanding">
          <p>Na pravom si mestu</p>
          <p>da dobijes <span className="spanPlanIshraneLanding">PLAN ISHRANE</span></p>
          <p>napravljen iskljucivo po tebi</p>  
        </button>
        <button className="buttonInputLanding" onClick={goToSIgnUp}>
          Unesi podatke
        </button>
      </div>
    </div>
  );
};

export default Landing;
