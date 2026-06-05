import { useNavigate } from "react-router";
import heartInactive from "../assets/icons/heartInactive.svg";
import comment from "../assets/icons/comment.svg";
import reshare from "../assets/icons/reshare.svg";
import gemOpskriftInactive from "../assets/icons/gemOpskriftInactive.svg";


export default function FeedCard({ profilPic, foodPics, profilNavn, profilComment, tid, recipeId, }) {

  const navigate = useNavigate()

    let needDots = false;

    if (foodPics.length > 1)
    {

        needDots = true;
    }
    else {
        needDots = false;
    }
    


  return (
    <div className="feed-card">
      <div className="feed-header">
               <img 
          src = { profilPic }
          
          alt="profile"
          className="profile-pic"
        /> 

              <p>{profilNavn}</p>
      </div>

       <div className="horizontal-slider">
  {foodPics.map((img, index) => (
    <img
      key={index}
        src={img}
        alt="food"
        className="food-image horizontal"
        onClick={() => navigate(`/recipe/${recipeId}`)}
      />
  ))}
</div>
          
<div
  className={`dots ${
    needDots ? "visible" : "hidden"
  }`}
>
  <span className="active"></span>
  <span></span>
</div>




      <div className="feed-actions">
        <div className="left-actions">
          <div className="icon-box">
            <img className="ikonerFarveChange" src={heartInactive} alt="heart" />
            <span>10</span>
          </div>

          <div className="icon-box">
            <img className="ikonerFarveChange" src={comment} alt="comment" />
          </div>
            <div>
               <img className="ikonerFarveChange" src={reshare} alt="reshare"/>       
            </div>
        </div>

        <img className="ikonerFarveChange" src={gemOpskriftInactive} alt="bookmark" />
      </div>

      <div className="feed-text">
        <p>
          Synes godt om claireholt og andre
        </p>
        <div className="commentar">
            <p>{profilNavn} </p> 
            <p>{profilComment}</p>
        </div>

        <p className="tidspunkt" >{tid}</p>
      </div>
      </div>
      
      
  )
}