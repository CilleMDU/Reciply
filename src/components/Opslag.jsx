import { useNavigate } from "react-router";
export default function Opslag({ recipes }) {

    const navigate = useNavigate()
    
    return (

        <div>

            {recipes.length == 0 && (

                <div className="opslag">

                    <h2>
                        Du har ikke delt en lækker opskrift endnu
                    </h2>

                    <div>
                        <img
                            src="/src/assets/mascots/ziggy.svg"
                            alt="ziggy"
                        />
                    </div>

                </div>

            )}

            {recipes.length > 0 && (

                <div className="recipeContainer">

                    {recipes.map((recipe, index) => (

                        <img
                            className="recipe"
                            key={index}
                            src={recipe.img}
                            alt="opskrift"
                            onClick={() => navigate(`/recipe/${recipe.id}`)}
                        />

                    ))}

                </div>

            )}

        </div>

    );
}