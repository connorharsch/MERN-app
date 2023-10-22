import { useEffect } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext";


//components
import TicketDetails from "../components/TicketDetails"
import { useAuthContext } from "../hooks/useAuthContext";

let interval;

const Home = () => {
    const {tickets, dispatch} = useTicketsContext();
    const {user} = useAuthContext()
    
    useEffect(() => {
        const fetchTickets = async() => {
            const response = await fetch("/api/tickets", {
                headers:{
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_TICKETS", payload: json})
            }
        }
        fetchTickets();
        clearInterval(interval)
        interval = setInterval(() => {
            if(localStorage.getItem("user")){
                fetchTickets();
                console.log("Tickets Fetched!")
            }
        }, 60 * 1000);
    }, [user.token, dispatch])

    return(
    <div className="page">
        <div className="tickets">
            {tickets && tickets.map((ticket) => (
                <div key={ticket._id} className="ticket-details">                
                    <TicketDetails key={ticket._id} ticket={ticket}/>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Home;