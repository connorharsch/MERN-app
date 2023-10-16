import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Submit from "./pages/Submit";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            exact path="/"
            element={<Home/>}
          />
          <Route
            exact path="/submit-ticket"
            element={<Submit/>}
          />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
