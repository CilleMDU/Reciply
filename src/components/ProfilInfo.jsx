import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilInfo({ activeTab, setActiveTab }) {
  const useNavigate = useNavigate();

  const handleGoToMascots = () => {
    useNavigate("/mascots");
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <header className="header">
        <button className="plus-btn">
          <img src="public/ikoner/plus.svg" alt="plus" />
        </button>

        <div className="profilNavn">
          <h1>lilje.pedersen</h1>
        </div>

        <div className="profilMenu">
          <img
            src="public/ikoner/profilMenu.svg"
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
              ? "/ikoner/opslagActive.svg"
              : "/ikoner/opslagInactive.svg"
          }
          alt="profilOpslag"
          onClick={() => setActiveTab("opslag")}
        />

        <img
          src={
            activeTab === "liked"
              ? "/ikoner/profilHeartActive.svg"
              : "/ikoner/profilHeartInactive.svg"
          }
          alt="profilHeart"
          onClick={() => setActiveTab("liked")}
        />

        <img
          src={
            activeTab === "gemt"
              ? "/ikoner/profilGemOpskriftActive.svg"
              : "/ikoner/profilGemOpskriftInactive.svg"
          }
          alt="profilOpskrift"
          onClick={() => setActiveTab("gemt")}
        />
      </div>
    </div>
  );
}
