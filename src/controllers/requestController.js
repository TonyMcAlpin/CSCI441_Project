import requestServices from "../services/requestServices.js"

// Get Request by id
const getRequest = async (req,res) => {

    const request_id = req.params.id;

    try{

        const request = await requestServices.getRequest(request_id);

        if(request.length === 0){
            return res.status(404).json({message: "Request Not Found"});
        }
        return res.status(200).json(request);

    }
    catch(err){
        console.error("Error When Retrieving Request", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};


// Make a Request
const makeRequest = async (req, res) => {
    
    const patient_id = req.body["patient_id"];
    const provider_id = req.params.provider_id;

    if(patient_id == null){
        return res.status(400).json({message: "You Must Select a Patient."});
    }

    try{
        await requestServices.makeRequest(patient_id, provider_id);
        return res.status(201).json({message: "Request Made Successfully!"});
    }
    catch(err){
        console.error("Error When Attempting To Make Request");
        return res.status(500).json({message: "Internal Server Error"})
    }

};



// Accept/Deny Request
const acceptDenyRequest = async (req, res) => {

    const request_id = req.params.id;
    const accept_date = req.body['accept_date'];
    const close_date = req.body['close_date'];

    try{
        await requestServices.updateRequest(accept_date, close_date, request_id);
        return res.status(200).json({message: "Patient Answered Successfully"})
    }
    catch(err){
        console.error("Error when patient responded to request", err);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

// Close Request
const closeRequest = async (req, res) => {
    
    const request_id = req.params.id;
    
    try {
        await requestServices.closeRequest(request_id);
        return res.status(200).json({ message: "Request closed successfully" });
    
    } catch (err) {
        console.error("Error when closing request", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Close Request
const cancelRequest = async (req, res) => {
    
    const request_id = req.params.id;
    
    try {
        await requestServices.cancelRequest(request_id);
        return res.status(200).json({ message: "Request cancelled successfully" });

    } catch (err) {
        console.error("Error when cancelling request", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export default {
    getRequest,
    makeRequest,
    acceptDenyRequest,
    closeRequest, 
    cancelRequest
}