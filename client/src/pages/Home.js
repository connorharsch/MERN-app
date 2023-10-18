import { useEffect } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext";

//components
import TicketDetails from "../components/TicketDetails"

const Home = () => {
    const {tickets, dispatch} = useTicketsContext();

    useEffect(() => {
        const fetchTickets = async() => {
            const response = await fetch("/api/tickets")
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_TICKETS", payload: json})
            }
        }

        fetchTickets();
    }, [])

    return(
    <div className="page">
        <div className="tickets">
            {tickets && tickets.map((ticket) => (
                <div className="ticket-details">                
                    <TicketDetails key={ticket._id} ticket={ticket}/>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Home;