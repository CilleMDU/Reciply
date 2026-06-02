import { useNavigate } from "react-router";
import { useTheme } from "../hooks/themeHook";
import logo from "../assets/icons/logo.svg";
import ziggy from "../assets/mascots/ziggy.svg";
import buzzy from "../assets/mascots/buzzy.svg";
import cherry from "../assets/mascots/cherry.svg";
import crispy from "../assets/mascots/crispy.svg";

export default function Opslag({ recipes }) {

    const navigate = useNavigate()
    const { crispyTheme, buzzyTheme, cherryTheme } = useTheme();

        const ziggyImage = crispyTheme
          ? crispy
          : buzzyTheme
            ? buzzy
            : cherryTheme
              ? cherry
              : ziggy;
      
    
    return (

        <div>

            {recipes.length == 0 && (

                <div className="opslag">

                    <h2>
                        Du har ikke delt en lækker opskrift endnu
                    </h2>

                    <div>
                        <img className="changeMascot"
                            src={ziggyImage}
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