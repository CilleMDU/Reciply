export default function FeedCard() {
  return (
    <div className="feed-card">
      <div className="feed-header">
        <img
          src='https://images.unsplash.com/photo-1694399120199-72ac9241c2f4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


          alt="profile"
          className="profile-pic"
        />

        <p>lucia_jensen</p>
      </div>

      <img
        src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="food"
        className="food-image"
      />

      <div className="dots">
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
        </div>

        <img src="public/ikoner/gemOpskriftInactive.svg" alt="bookmark" />
      </div>

      <div className="feed-text">
        <p>
          Synes godt om <strong>lilje.pedersen</strong>
        </p>

        <span>For 2 min siden</span>
      </div>
    </div>
  )
}