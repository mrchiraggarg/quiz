import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Homepage from './Pages/Homepage';
import Blog from './Pages/Blog';
import ReadBlog from './Pages/ShowBlog';
import Quiz from './Pages/Quiz';
import CreateQuiz from './Pages/CreateQuiz2';
import ShareLink from './Pages/ShareLink';
import PlayQuiz from './Pages/PlayQuiz';
import PlayerScoreCard from './Pages/PlayerScoreCard';
import ResAnswerCard from './Pages/ResAnswerCard';
import TermsOfUse from './Pages/TermsOfUse';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import AboutUs from './Pages/AboutUs';
import SocialPage from './Pages/SocialPage';
import ContactUs from './Pages/ContactUs';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <Route exact path="/"><Homepage /></Route>
        <Route exact path="/blog"><Blog /></Route>
        <Route exact path="/blog/:id"><ReadBlog /></Route>       
        <Route exact path="/quiz"><Quiz /></Route>
        <Route exact path="/quiz/:id"><CreateQuiz /></Route>
        <Route exact path="/quiz/share-link/:urlid"><ShareLink /></Route>       
        <Route exact path="/quiz/p/:urlid"><PlayQuiz /></Route>
        <Route exact path="/quiz/p/score/:_id"><PlayerScoreCard /></Route>
        <Route exact path="/quiz/a/:_id"><ResAnswerCard /></Route>
        <Route exact path="/terms-of-use"><TermsOfUse /></Route>
        <Route exact path="/privacy-policy"><PrivacyPolicy /></Route>
        <Route exact path="/about-us"><AboutUs /></Route>
        <Route exact path="/social"><SocialPage /></Route>
        <Route exact path="/contact-us"><ContactUs /></Route>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
