import { useState } from "react";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TicketForm = () => {
    //State Instantiation
    const {dispatch} = useTicketsContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [urgency, setUrgency] = useState(1)
    const [impacted, setImpacted] = useState(1)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in!")
            return
        }

        const ticket = {title, summary, urgency, impacted, name, email, phone}

        const response = await fetch("/api/tickets", {
            method: 'POST',
            body: JSON.stringify(ticket),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            //sends necessary json data to insert new document in db
            dispatch({type: "CREATE_TICKET", payload: json})
            window.open("/", "_self")
        }
    }

    

    return(
        <form className="create" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <label>What kind of issue are you experiencing today? <b><b><span>*</span></b></b></label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>What more can you tell us about the issue? <b><b><span>*</span></b></b></label>
            <textarea 
                type="text"
                onChange={(e) => setSummary(e.target.value)}
                value={summary}
                className={emptyFields.includes("summary") ? "error" : ""}
            />

            <div className="sliders">
                <div className="halve">
                    <div className="slide-container">
                        <div className="label-container">
                            How urgent is this issue?
                        </div>
                        <input 
                            type="range"
                            max={2}
                            onChange={(e) => setUrgency(e.target.value)}
                            value={urgency}
                        />
                        <ul>
                            <li>Not Urgent</li>
                            <li>Normal</li>
                            <li>Urgent</li>
                        </ul>
                    </div>
                </div>
                <div className="halve">
                    <div className="slide-container">
                        <div className="label-container">
                            Who is impacted by this issue?
                        </div>
                        <input 
                            type="range"
                            max={3}
                            onChange={(e) => setImpacted(e.target.value)}
                            value={impacted}
                        />
                        <ul>
                            <li>Only Me</li>
                            <li>Don't Know</li>
                            <li>Others</li>
                            <li>Company</li>
                        </ul>
                            
                    </div>
                </div>
            </div>
            <label>Your name <b><span>*</span></b></label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes("name") ? "error" : ""}
            />
            <label>Your e-mail <b><span>*</span></b></label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes("email") ? "error" : ""}
            />
            <label>Your phone number <b><span>*</span></b></label>
            <input 
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className={emptyFields.includes("phone") ? "error" : ""}
            />
            {error && <div className="error">{error}</div>}
            <button>Submit</button>
        </form>
    )
}

export default TicketForm