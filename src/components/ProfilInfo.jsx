import { useNavigate } from "react-router-dom";
import { useState } from "react";
import plusIcon from "../assets/icons/plus.svg";
import profilMenuIcon from "../assets/icons/profilMenu.svg";
import opslagActiveIcon from "../assets/icons/opslagActive.svg"
import opslagInactiveIcon from "../assets/icons/opslagInactive.svg"
import profilHeartActiveIcon from "../assets/icons/heartActive.svg"
import profilHeartInactiveIcon from "../assets/icons/heartInactive.svg"
import profilGemOpskriftActiveIcon from "../assets/icons/profilGemOpskriftActive.svg"
import profilGemOpskriftInactiveIcon from "../assets/icons/profilGemOpskriftInactive.svg"
  
export default function ProfilInfo({ activeTab, setActiveTab }) { 
    
    const navigate = useNavigate();

    const handleGoToCreateRecipe = () => {
      navigate("/createRecipe");
    }

  const handleGoToMascots = () => {
    navigate("/mascots");
  };

  const [showMenu, setShowMenu] = useState(false);
            
            


  return (
    <div>
        <header className="header">
            <button className="plus-btn" onClick={handleGoToCreateRecipe}>
                <img src={plusIcon} alt="plus" />
            </button>

        <div className="profilNavn">
          <h1>lilje.pedersen</h1>
        </div>

        <div className="profilMenu">
          <img
            src={profilMenuIcon}
            alt="logo"
            className="profilMenu"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="profilmenu">
              <h3>Rediger profil</h3>
              <h3 onClick={handleGoToMascots}>Skift maskot</h3>
              <h3>Slet profil</h3>
            </div>
          )}
        </div>
      </header>
      <section className="profilinfo">
        <div className="profilbillede">
          <img
            className="lilje"
            src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profilBillede"
          />
        </div>

        <h2>Opslag</h2>
        <h2>Følger</h2>
        <h2>Følgere</h2>
      </section>

      <div className="profilNav">
        <img
          src={
            activeTab === "opslag"
              ? opslagActiveIcon
              : opslagInactiveIcon
          }
          alt="profilOpslag"
          onClick={() => setActiveTab("opslag")}
        />

        <img
          src={
            activeTab === "liked"
              ? profilHeartActiveIcon
              : profilHeartInactiveIcon
          }
          alt="profilHeart"
          onClick={() => setActiveTab("liked")}
        />

        <img
          src={
            activeTab === "gemt"
              ? profilGemOpskriftActiveIcon
              : profilGemOpskriftInactiveIcon
          }
          alt="profilOpskrift"
          onClick={() => setActiveTab("gemt")}
        />
      </div>
    </div>
  );
}
