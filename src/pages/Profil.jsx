import { useState } from "react";

import Gemt from "../components/Gemt";
import Liked from "../components/Liked";
import Opslag from "../components/Opslag";
import ProfilInfo from "../components/ProfilInfo"
export default function Profil() {

    const [activeTab, setActiveTab] =
        useState("opslag");
    
    return (
        <>
            <div>

                <ProfilInfo
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === "opslag" && (
                    <Opslag />
                )}

                {activeTab === "liked" && (
                    <Liked />
                )}

                {activeTab === "gemt" && (
                    <Gemt />
                )}

            </div>
        </>
    );
}