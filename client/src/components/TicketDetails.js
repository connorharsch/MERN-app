import { useTicketsContext } from "../hooks/useTicketsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TicketDetails = ({ticket}) => {
    const { dispatch } = useTicketsContext();
    const { user } = useAuthContext()

    var urgency = ticket.urgency;
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
    
    var impacted = ticket.impacted;
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

    // get ticketID header EX.) "#TYYYYMMDD"
    var date = new Date(ticket.createdAt);
    var mm = date.getMonth()+1;
    var dd = date.getDate();

    if(mm < 10){
        mm = 0 + "" + mm;
    }
    if(dd < 10){
        dd = 0 + "" + dd;
    }

    var ticketID = "T" + date.getFullYear() + "-" + mm + "-" + dd;
    
    //get time since created
    var now = new Date();
    var since = now.getTime() - date.getTime();

    var minutesSince = since / (1000 * 60);
    minutesSince = minutesSince.toFixed(0);
    
    var hoursSince = since / (1000 * 3600);
    hoursSince = hoursSince.toFixed(0);

    var daysSince = since / (1000 * 3600 * 24);
    daysSince = daysSince.toFixed(0);

    if(daysSince > 1){
        date = daysSince + " days ago";
    }else if (daysSince == 1){
        date = daysSince + " day ago";
    }else if(hoursSince > 1){
        date = hoursSince + " hours ago";
    }else if(hoursSince == 1){
        date = hoursSince + " hour ago";
    }else if(minutesSince > 1){
        date = minutesSince + " minutes ago";
    }else if(minutesSince == 1){
        date = minutesSince + " minute ago";
    }else{
        date = "just now!"
    }

    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch("/api/tickets/" + ticket._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if(response.ok){
            dispatch({type: "DELETE_TICKET", payload: json})
        }
    };

    return(
        <div className="TicketDetails">
            <h4>Ticket #: <strong>{ticketID}</strong></h4>
            <h4>{ticket.title}</h4>
            <strong>Summary:</strong> 
            <p>{ticket.summary}</p>
            <strong>Urgency:</strong> 
            <p>{urgency}</p>
            <strong>Impacted:</strong> 
            <p>{impacted}</p>
            <strong>Name:</strong> 
            <p>{ticket.name}</p>
            <strong>E-mail:</strong> 
            <p>{ticket.email}</p>
            <strong>Phone:</strong> 
            <p>{ticket.phone}</p>
            <strong>Created:</strong>
            <p>{date}</p>
            <div className="trash-can">
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            </div>
        </div>
    );
};
export default TicketDetails;