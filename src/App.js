import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Quotes from "./container/Quotes";
import stocks from "./container/DetailsListings";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={stocks} />
          <Route exact path="/quotes/:symbol" component={Quotes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
