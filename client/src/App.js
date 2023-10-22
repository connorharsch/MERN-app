import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Submit from "./pages/Submit";
import Navbar from "./components/Navbar";



function App() {
  const { user } = useAuthContext()

  console.log(window.location.pathname)

  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            exact path="/"
            element={user ? <Home/> : <Navigate to = "/log-in"/>}
          />
          <Route
            exact path="/log-in"
            element={!user ? <Login/> : <Navigate to = "/"/>}
          />
          <Route
            exact path="/sign-up"
            element={!user ? <Signup/> : <Navigate to = "/"/>}
          />
          <Route
            exact path="/submit-ticket"
            element={localStorage.getItem("user") ? <Submit/> : <Navigate to = "/log-in"/>}
          />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
