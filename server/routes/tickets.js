const express = require("express");
const {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
} = require("../controllers/ticketController");

const router = express.Router();

// Routes
//Get All Tickets
router.get("/", getTickets);

//Get Single Ticket
router.get("/:id", getTicket)

//Create New Ticket
router.post("/", createTicket)

//Delete Ticket
router.delete("/:id", deleteTicket)

//Update Ticket
router.patch("/:id", updateTicket)

module.exports = router;