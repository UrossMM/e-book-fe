import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const goToSIgnUp = () => {
    navigate("data");
  };

  return (
    <div id="sekcija">
      {/* <h1 class="headerLanding">
        Na pravom si mestu da dobijes plan ishrane napravljen iskljucivo po tebi
      </h1> */}
      <div className="divButtonsLanding">
        <button class="buttonTextLanding">
          <p>Na pravom si mestu</p>
          <p>da dobijes <span className="spanPlanIshraneLanding">PLAN ISHRANE</span></p>
          <p>napravljen iskljucivo po tebi</p>  
        </button>
        <button class="buttonInputLanding" onClick={goToSIgnUp}>
          Unesi podatke
        </button>
      </div>
    </div>
  );
};

export default Landing;
