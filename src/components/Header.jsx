import { useNavigate } from "react-router-dom";
import plus from "../assets/icons/plus.svg";
import logo from "../assets/icons/logo.svg";

export default function Header() {
      const navigate = useNavigate();

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
        <img src="src/assets/mascots/ziggy.svg" alt="logo" className="maskot-ikon" />
      </div>
    </header>
  )
}