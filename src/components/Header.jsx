import { useNavigate } from "react-router-dom";

export default function Header() {
      const navigate = useNavigate();

    const handleGoToCreateRecipe = () => {
      navigate("/createRecipe");
    }

  return (
    <header className="header">
      <button className="plus-btn" onClick={handleGoToCreateRecipe}>
        <img src="public/ikoner/plus.svg" alt="plus" />
      </button>

      <div className="logo">
        <img src="public/ikoner/logo.svg" alt="logo"/>
      </div>

      <div className="ziggy-ikon">
        <img src="src/assets/mascots/ziggy.svg" alt="logo" className="maskot-ikon" />
      </div>
    </header>
  )
}