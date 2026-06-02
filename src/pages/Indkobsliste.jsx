import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { recipeService } from "../services/recipeService";
import { indkobslisteService } from "../services/indkobslisteService";
import tilbage from "../assets/icons/tilbage.svg";
import skrallespan from "../assets/icons/skrallespan.svg"
import frem from "../assets/icons/frem.svg"

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
            console.error("Fejlede load af recipe:", error);
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

    return (

        <div className="indkobSIndhold">

            <header className="header">
      <button className="tilbage-btn">
        <img  className="ikonerFarveChange" src={tilbage} alt="tilbage" onClick={() => navigate(`/indkobOversigt`)}/>
      </button>

      <div className="logo">
        <h1>Indkøbsliste</h1>
      </div>

      <div className="skrallespan">
        <img className="ikonerFarveChange" src={skrallespan} alt="skrallespan" />
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
                                <img className="ikonerFarveChange" src={frem} alt="frem" />
                        </button>
                    </div>
                )}

        </div>

    );
}
