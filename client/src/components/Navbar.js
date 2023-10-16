import { Link } from "react-router-dom";
import logo from './mbs-logo.png';

const Navbar = () => {
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>My Tickets</h1>
                </Link>
                <Link to="http://www.metrombs.com">
                    <img src={logo}/>
                </Link>
                <Link to="/submit-ticket">
                    <h2>Create Ticket</h2>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;