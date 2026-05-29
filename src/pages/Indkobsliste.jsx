import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { recipeService } from "../services/recipeService";

export default function Indkobsliste() {
    const { recipeId } = useParams();

    

      useEffect(() => {

            loadRecipe(recipeId);
            
        }, []);

        async function loadRecipe(recipeId) {
            try {
            const recipe = await recipeService.fetchRecipeById(recipeId);

                console.log(recipe);
                setIngrediensListe(recipe.ingredients)

            } catch (error) {
            console.error("Failed to load recipes:", error);
            }
        };
    

    const [ingrediensListe, setIngrediensListe] = useState([]);

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
