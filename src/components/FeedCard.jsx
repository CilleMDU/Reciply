export default function FeedCard({ profilPic, foodPics, profilNavn, profilComment, tid, }) {


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
            <img src="public/ikoner/heartInactive.svg" alt="heart" />
            <span>10</span>
          </div>

          <div className="icon-box">
            <img src="public/ikoner/comment.svg" alt="comment" />
          </div>
            <div>
               <img src="public/ikoner/reshare.svg" alt="reshare"/>       
            </div>
        </div>

        <img src="public/ikoner/gemOpskriftInactive.svg" alt="bookmark" />
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