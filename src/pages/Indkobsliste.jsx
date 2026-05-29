import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { recipeService } from "../services/recipeService";
import {indkobslisteService } from "../services/indkobslisteService";

export default function Indkobsliste() {
    const { listId } = useParams();
    const [ingrediensListe, setIngrediensListe] = useState([]);

    
    

      useEffect(() => {

            loadRecipe(listId);
            
        }, []);

        async function loadRecipe(indkobslisteId) {
            try {
                const test = await indkobslisteService.fetchIndkobslisteById(indkobslisteId)
                console.log(test);
                setIngrediensListe(test)

            } catch (error) {
            console.error("Failed to load recipes:", error);
            }
        };
    


    function checkboxHandler(index) {

        const updatedList = [...ingrediensListe];

        updatedList[index].checked =
            !updatedList[index].checked;

        setIngrediensListe(updatedList);
    }

    return (

        <div className="indkobSIndhold">

            <header className="header">
      <button className="tilbage-btn">
        <img src="/ikoner/tilbage.svg" alt="tilbage" />
      </button>

      <div className="logo">
        <h1>Indkøbsliste</h1>
      </div>

      <div className="skrallespan">
        <img src="/ikoner/skrallespan.svg" alt="skrallespan" className="skrallespan" />
      </div>
    </header>

            {ingrediensListe.map((tempObjekt, index) => (

                <div
                    className="ingrediensliste"
                    key={index}
                >

                    <h2 className="navn">
                        {tempObjekt.name}
                    </h2>

                    <h2 className="amount">
                        {tempObjekt.amount}
                    </h2>

                    <button
                        className={
                            tempObjekt.checked
                                ? "indkobKnap checked"
                                : "indkobKnap"
                        }

                        onClick={() =>
                            checkboxHandler(index)
                        }
                    >

                        {tempObjekt.checked && "✓"}

                    </button>

                </div>

            ))}
            <div className="tilOpskriftKnap">
                <button className="gaTilOpskrift">Gå til opskrift
                    <img className="fremPil" src="/ikoner/frem.svg" alt="frem" />
                    </button>
            </div>

        </div>

    );
}
