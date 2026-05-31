import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { indkobslisteService } from "../services/indkobslisteService";
import {recipeService} from "../services/recipeService"

export default function IndkobOversigt() {
    const navigate = useNavigate();

    const [indkobslister, setIndkobslister] = useState([]);

    useEffect(() => {
        loadIndKobsLists();
    }, []);

    async function loadIndKobsLists() {
        try {
            const data = await indkobslisteService.fetchAllIndkobsLists();

            const listsWithImages = await Promise.all(
                data.map(async (list) => {
                    console.log(list)
                    if (!list.recipe_id) {
                        return {
                            ...list,
                            image: null
                        };
                    }

                    const recipeData = await loadRecipe(list.recipe_id);

                    return {
                        ...list,
                        image: recipeData?.img ?? null
                    };
                })
            );

            console.log(listsWithImages)
            setIndkobslister(listsWithImages);
        } catch (error) {
            console.error("fejlede loading af indkobslister:", error);
        }
    }

    
    
        async function loadRecipe(recipe_id) {
        try {
            const data = await recipeService.fetchRecipeById(recipe_id);

            return data

        } catch (error) {
            console.error("fejlede loading af recipe:", error);
        }
    }

    function handleGoToIndkobsliste(id) {
        navigate(`/indkobsliste/${id}`);
    }

    return (
        <>
            <header className="header">
                <button className="plus-btn">
                    <img
                        src="/ikoner/plus.svg"
                        alt="plus"
                        onClick={() => navigate("/indkobsOpret")}
                    />
                </button>

                <div className="profilNavn">
                    <h1>Indkøbslister</h1>
                </div>

                <div className="profilMenu">
                    <img
                        src="/ikoner/profilMenu.svg"
                        alt="logo"
                        className="profilMenu"
                    />
                </div>
            </header>

            <main className="indkob_main">
                <div className="sogfelt">
                    <img src="/ikoner/sogActive.svg" alt="sog" />
                </div>

                <div className="indkobBilledeWrapper">
                    {indkobslister.map((liste) => (
                        <div
                            key={liste.id}
                            className="enkelListe"
                            onClick={() => handleGoToIndkobsliste(liste.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                className="indkobFood"
                                src={
                                    liste.image ??
                                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
                                }
                                alt={liste.title}
                                onError={(e) => {
                                    e.target.src =
                                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop";
                                }}
                            />

                            <h2>{liste.title}</h2>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}