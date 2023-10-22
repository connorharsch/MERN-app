const express = require("express");
const {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
} = require("../controllers/ticketController");
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

//require webtoken for all routes
router.use(requireAuth)

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