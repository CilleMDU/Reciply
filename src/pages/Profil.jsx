import { useState , useEffect } from "react";

import Gemt from "../components/Gemt";
import Liked from "../components/Liked";
import Opslag from "../components/Opslag";
import ProfilInfo from "../components/ProfilInfo"
import { recipeService } from "../services/recipeService";

export default function Profil() {

    const [activeTab, setActiveTab] =
        useState("opslag");
    
  const [opslagOpskrift, setOpslagOpskrift] = useState([]);
    
    
useEffect(() => {

    loadRecipes();
  }, []);

  async function loadRecipes(){
  try {
    const recipes = await recipeService.fetchAllRecipes();

    setOpslagOpskrift(recipes)
  } catch (error) {
    console.error("Failed to load recipes:", error);
  }
    };
    console.log(opslagOpskrift)

    
    return (
        <>
            <div> 

                <ProfilInfo
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === "opslag" && (
                    <Opslag
                        recipes={opslagOpskrift}
                    />
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
