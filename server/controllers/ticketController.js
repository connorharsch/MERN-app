
const Ticket = require("../models/ticketModel")
const mongoose = require("mongoose");

// get all tickets
const getTickets = async(req, res) => {
    const user_id = req.user._id
    const admin_id = process.env.ADMIN_ID

    var tickets;

    if(user_id == admin_id){
        tickets = await Ticket.find({}).sort({createdAt: -1});
    }else{
        tickets = await Ticket.find({ user_id }).sort({createdAt: -1});
    }
 

    res.status(200).json(tickets);
}

// get single ticket
const getTicket = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Ticket Of Such ID: " + id})
    }

    const ticket = await Ticket.findById(id);

    if(!ticket) {
        return res.status(400).json({error: "No Ticket Found!"});
    }

    res.status(200).json(ticket);
}

// create new ticket
const createTicket = async(req, res) => {
    const {title, summary, urgency, impacted, name, email, phone} = req.body;

    let emptyFields = []

    //skip validating for urgency and impacted because they are both range inputs

    if(!title){
        emptyFields.push("title")
    }
    if(!summary){
        emptyFields.push("summary")
    }
    if(!name){
        emptyFields.push("name")
    }
    if(!email){
        emptyFields.push("email")
    }
    if(!phone){
        emptyFields.push("phone")
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all required fields", emptyFields})
    }

    try{
        const user_id = req.user._id
        const ticket = await Ticket.create({title, summary, urgency, impacted, name, email, phone, user_id});
        res.status(200).json(ticket);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// delete a ticket
const deleteTicket = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Ticket Of Such ID: " + id})
    }

    const ticket = await Ticket.findOneAndDelete({_id: id});

    if(!ticket) {
        return res.status(400).json({error: "No Ticket Found!"});
    }

    res.status(200).json(ticket);
}
// update a ticket
const updateTicket = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Ticket Of Such ID: " + id})
    }

    const ticket = await Ticket.findOneAndUpdate({_id: id}, {
        ...req.body  
    });

    if(!ticket) {
        return res.status(400).json({error: "No Ticket Found!"});
    }

    res.status(200).json(ticket);
}

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}