import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import logo from './mbs-logo.png';

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout();
    }

    return(
        <header>
            <div className="header">
                <div className="header-left">
                    <Link to="http://www.metrombs.com">
                        <img src={logo}/>
                    </Link>
                </div>

                <div className="header-right">
                    {user && (
                    <div>
                        <Link onClick={handleClick} >
                            <h2>Log Out</h2>
                        </Link>
                        <Link to="/">
                            <h2>My Tickets</h2>
                        </Link>
                        <Link to="/submit-ticket" >
                            <h2>Create Ticket</h2>
                        </Link>                                       
                    </div>
                    )}
                    
                    {!user && (
                    <div>
                        <Link to="/log-in">
                            <h2>Log In</h2>
                        </Link>
                        <Link to="/sign-up">
                            <h2>Sign Up</h2>
                        </Link>
                    </div>
                    )}
                </div>
            </div>
        </header>
)};

export default Navbar;