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
            return -1
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
            return -1
    }
    
    var now = new Date();
    var date = new Date(ticket.createdAt);

    var since = now.getTime() - date.getTime();

    var daysSince = since / (1000 * 3600 * 24);
    daysSince = "d: " + daysSince.toFixed(0);

    var hoursSince = since / (1000 * 3600);
    hoursSince = "h: " + hoursSince.toFixed(0);

    var minutesSince = since / (1000 * 60);
    minutesSince = "m: " + minutesSince.toFixed(0);

    var mm = date.getMonth()+1;
    var dd = date.getDate();

    if(mm < 10){
        mm = 0 + "" + mm;
    }
    if(dd < 10){
        dd = 0 + "" + dd;
    }
    var ticketID = "T" + date.getFullYear() + "-" + mm + "-" + dd;

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
            <h4><strong>{ticketID}</strong> "{ticket.title}"</h4>
            <p><strong>Summary:</strong> <p>{ticket.summary}</p></p>
            <p><strong>Urgency:</strong> <p>{urgency}</p></p>
            <p><strong>Impacted:</strong> <p>{impacted}</p></p>
            <p><strong>Name:</strong> <p>{ticket.name}</p></p>
            <p><strong>E-mail:</strong> <p>{ticket.email}</p></p>
            <p><strong>Phone:</strong> <p>{ticket.phone}</p></p>
            <br/>
            <p>{daysSince + ": " + hoursSince + ": " + minutesSince + " || " + date}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};



export default TicketDetails;