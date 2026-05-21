import { useState } from "react";
import Header from "../components/header";
import Stories from "../components/Stories";
import FeedCard from "../components/FeedCard";
import TipBubble from "../components/TipBubble";

export default function Home() {
  const [showBubble, setShowBubble] =
    useState(true);

  let posts=[];

  const post1 =
    ["https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      , "https://plus.unsplash.com/premium_photo-1700746098867-29b475283b51?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZHVtcGxpbmdzfGVufDB8fDB8fHww"
    ]
  const post2 = ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
  const post3 = ["https://plus.unsplash.com/premium_photo-1673809798970-30c14cfd0ab6?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
  const post4 = ["https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
  const post5 = ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1381&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
  posts[0] = post1;
  posts[1] = post2;
  posts[2] = post3;
  posts[3] = post4;
  posts[4] = post5;

  console.log(posts)
  
  
  return (
    <div className="home">

      <Header />
      
      <Stories />

      {
        posts.map((post, index) => (
          <FeedCard
            profilPic="https://images.unsplash.com/photo-1694399120199-72ac9241c2f4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            foodPics={post}
            profilNavn="lucia_jensen"
            key={index}
          />
      )
        )
      }

      {showBubble && (
        <TipBubble
          setShowBubble={setShowBubble}
        />
      )}

    </div>
  );
}

