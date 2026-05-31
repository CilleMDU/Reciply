import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { recipeService } from "../services/recipeService";
import {indkobslisteService } from "../services/indkobslisteService";

export default function Indkobsliste() {
    const { listId } = useParams();
    const [itemsListe, setItemsListe] = useState([]);
    const [indkobListe, setIndkobListe] = useState([]);
    const navigate = useNavigate();
    

    
    

      useEffect(() => {

            loadItems(listId);
            
        }, []);

        async function loadItems(indkobslisteId) {
            try {
                const data = await indkobslisteService.fetchIndkobslisteById(indkobslisteId)
                setItemsListe(data.itemData)
                setIndkobListe(data.indkobsListeData[0])

            } catch (error) {
            console.error("Failed to load recipes:", error);
            }
        };
    


    async function checkboxHandler(index) {

        const updatedList = [...itemsListe];

        updatedList[index].checked =
            !updatedList[index].checked;

        setItemsListe(updatedList);

        try {
            await indkobslisteService.updateIndkobsItem(updatedList[index]);
        } catch (error) {
            console.error("Failed to update ingredient:", error);
        }
    }

    console.log(itemsListe)
    console.log(indkobListe)
    console.log(indkobListe.recipe_id)

    return (

        <div className="indkobSIndhold">

            <header className="header">
      <button className="tilbage-btn">
        <img src="/ikoner/tilbage.svg" alt="tilbage" onClick={() => navigate(`/indkobOversigt`)}/>
      </button>

      <div className="logo">
        <h1>Indkøbsliste</h1>
      </div>

      <div className="skrallespan">
        <img src="/ikoner/skrallespan.svg" alt="skrallespan" className="skrallespan" />
      </div>
    </header>

            {itemsListe.map((tempObjekt, index) => (

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
                {indkobListe?.recipe_id && (
                    <div className="tilOpskriftKnap">
                        <button
                            className="gaTilOpskrift"
                            onClick={() => navigate(`/recipe/${indkobListe.recipe_id}`)}
                        >
                            Gå til opskrift
                            <img className="fremPil" src="/ikoner/frem.svg" alt="frem" />
                        </button>
                    </div>
                )}

        </div>

    );
}
