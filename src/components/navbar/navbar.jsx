import styles from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import home from "../../assets/navIcons/homeInaktiv.svg";
import tips from "../../assets/navIcons/tipsInaktiv.svg";
import søg from "../../assets/navIcons/søgInaktiv.svg";
import indkøb from "../../assets/navIcons/indkøbInaktive.svg";
import profil from "../../assets/navIcons/profilInaktiv.svg";
import homeAct from "../../assets/navIcons/homeAktiv.svg";
import tipsAct from "../../assets/navIcons/tipAktiv.svg";
import søgAct from "../../assets/navIcons/søgAktiv.svg";
import indkøbAct from "../../assets/navIcons/indkøbAktiv.svg";
import profilAct from "../../assets/navIcons/profilAktiv.svg";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.navHome}>
        {({ isActive }) => <img src={isActive ? homeAct : home} alt="feed" />}
      </NavLink>
      <NavLink to="/tipsOgTricks" className={styles.navTips}>
        {({ isActive }) => (
          <img src={isActive ? tipsAct : tips} alt="tips og tricks" />
        )}
      </NavLink>
      <NavLink to="/search" className={styles.navSøg}>
        {({ isActive }) => <img src={isActive ? søgAct : søg} alt="søg" />}
      </NavLink>
      <NavLink to="/indkøbsliste" className={styles.navList}>
        {({ isActive }) => (
          <img src={isActive ? indkøbAct : indkøb} alt="indkøbsliste" />
        )}
      </NavLink>
      <NavLink to="/profil" className={styles.navProfil}>
        {({ isActive }) => (
          <img src={isActive ? profilAct : profil} alt="profil" />
        )}
      </NavLink>
    </nav>
  );
}
