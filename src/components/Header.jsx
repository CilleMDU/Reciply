import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/themeHook";
import plus from "../assets/icons/plus.svg";
import logo from "../assets/icons/logo.svg";
import ziggy from "../assets/mascots/ziggy.svg";
import buzzy from "../assets/mascots/buzzy.svg";
import cherry from "../assets/mascots/cherry.svg";
import crispy from "../assets/mascots/crispy.svg";

export default function Header() {
      const navigate = useNavigate();
      const { crispyTheme, buzzyTheme, cherryTheme } = useTheme();

        const ziggyImage = crispyTheme
          ? crispy
          : buzzyTheme
            ? buzzy
            : cherryTheme
              ? cherry
              : ziggy;
      

    const handleGoToCreateRecipe = () => {
      navigate("/createRecipe");
    }

  return (
    <header className="header">
      <button className="plus-btn" onClick={handleGoToCreateRecipe}>
        <img className="ikonerFarveChange" src={plus} alt="plus" />
      </button>

      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>

      <div className="ziggy-ikon">
        <img src={ziggyImage} alt="notifikationscenter" className="maskot-ikon" />
      </div>
    </header>
  )
}