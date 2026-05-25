import Gemt from "../components/Gemt";
import Liked from "../components/Liked";
import Opslag from "../components/Opslag";
import ProfilInfo from "../components/ProfilInfo"
export default function Profil() {

    return (
        <>
            <ProfilInfo />
            <Gemt/>
            <Liked/>
            <Opslag/>
        </>
    )
}