import { useEffect, useState } from "react";
import Header from "../components/Header";
import Stories from "../components/Stories";
import FeedCard from "../components/FeedCard";
import TipBubble from "../components/TipBubble";
import { recipeService } from "../services/recipeService";

export default function Home() {
  const [showBubble, setShowBubble] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    loadRecipes();
    
  }, []);

  async function loadRecipes() {
    try {
      const recipes = await recipeService.fetchAllRecipes();

      mergeFakeUserPostDataWithDatabaseRecipeData(recipes , mockupData);
    } catch (error) {
      console.error("Failed to load recipes:", error);
    }
  };
  
  //da vi ikke har nogen brugere i databasen.
  //har vi lavet noget mockup data med brugere og posts, som vi merge med de recipes vi har fra databasen
function mergeFakeUserPostDataWithDatabaseRecipeData(databaseRecipes, mockupData) {

  const mergedData = mockupData.map((mockItem) => {

    const matchedRecipe = databaseRecipes.find(
      (recipe) => recipe.id === mockItem.recipeId
    );

    if (matchedRecipe) {

      const updatedFoodPics = mockItem.foodPics.includes(matchedRecipe.img)
        ? mockItem.foodPics
        : [matchedRecipe.img , ...mockItem.foodPics];

      return {
        ...mockItem,
        profilComment: matchedRecipe.information,
        foodPics: updatedFoodPics,
      };
    }

    return mockItem;
  });

  setPosts(mergedData);
}

  const mockupData = [
    {
      foodPics: [
        "https://plus.unsplash.com/premium_photo-1700746098867-29b475283b51?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZHVtcGxpbmdzfGVufDB8fDB8fHww",
      ],
      profilPic:
        "https://images.unsplash.com/photo-1694399120199-72ac9241c2f4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      profilNavn: "lucia_jensen",
      profilComment: "Super lækker aftensmad jeg lavede den anden dag",
      tid: "For 2 min siden",
      recipeId: 3,
    },

    {
      foodPics: [
      ],
      profilPic:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      profilNavn: "claireholt",
      profilComment: "Hvis du leder efter en lækker taco opskrift så er...",
      tid: "For 30 min siden",
      recipeId: 4,
    },

    {
      foodPics: [
     ],
      profilPic:
        "https://images.unsplash.com/photo-1593757107729-eae8bcc74f8e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      profilNavn: "mathias.bennick",
      profilComment: "OMG en god pastaret jeg spise igår",
      tid: "For 1 time siden",
      recipeId: 5,
    },

    {
      foodPics: [
        "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      profilPic:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      profilNavn: "nielsenmathilde",
      profilComment: "Jeg er så stolt over de pandekager jeg fik lavet",
      tid: "For 3 timer siden",
      recipeId: 2,
    },

    // {
    //   foodPics: [
    //     "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1381&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   ],
    //   profilPic:
    //     "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   profilNavn: "larsjensen",
    //   profilComment: "Jeg elsker PIZZA",
    //   tid: "For 1 dag siden",
    //   recipeId: 2,
    // },
  ];


  

  return (
    <div className="home">
      <Header />

      <Stories />

      {posts.map((post, index) => (
        <FeedCard
          profilPic={post.profilPic}
          foodPics={post.foodPics}
          profilNavn={post.profilNavn}
          profilComment={post.profilComment}
          tid={post.tid}
          recipeId={post.recipeId}
          key={index}
        />
      ))}

      {showBubble && <TipBubble setShowBubble={setShowBubble} />}
    </div>
  );
}
