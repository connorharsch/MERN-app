import { useTicketsContext } from "../hooks/useTicketsContext";

const TicketDetails = ({ticket}) => {
    const { dispatch } = useTicketsContext();

    var urgency = ticket.urgency;
    var impacted = ticket.impacted;
    switch(urgency){
        case 0:
            urgency = "Not Urgent"
            break;
        case 1:
            urgency = "Normal"
            break;
        case 2:
            urgency = "Urgent"
            break;
        default:
            return
    }
    switch(impacted){
        case 0:
            impacted = "Only Me"
            break;
        case 1:
            impacted = "Don't Know"
            break;
        case 2:
            impacted = "Others"
            break;
        case 3:
            impacted = "Company"
            break;
        default:
            return
    }

    const handleClick = async () => {
        const response = await fetch("/api/tickets/" + ticket._id, {
            method: "DELETE"
        });
        const json = await response.json();

        if(response.ok){
            dispatch({type: "DELETE_TICKET", payload: json})
        }
    };

    return(
        <div className="TicketDetails">
            <h4>{ticket.title}</h4>
            <p><strong>Summary: </strong>{ticket.summary}</p>
            <p><strong>Urgency: </strong>{urgency}</p>
            <p><strong>Impacted: </strong>{impacted}</p>
            <p><strong>Name: </strong>{ticket.name}</p>
            <p><strong>E-mail: </strong>{ticket.email}</p>
            <p><strong>Phone: </strong>{ticket.phone}</p>
            <p>{ticket.createdAt}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};



export default TicketDetails;