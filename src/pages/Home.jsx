import Header from '../components/Header'
import Stories from '../components/Stories'
//import FeedCard from '../components/FeedCard'
import FeedCard from '../components/FeedCard'
import TipBubble from '../components/TipBubble'
//import TipBubble from '../components/TipBubble'

export default function Home() {
  return (
    <div className="home">
      <Header />
      
      <Stories />

      <FeedCard />
      
      <TipBubble/>
      
    </div>
  )
}