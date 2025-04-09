import activityServices from "../services/activityServices.js";

const getActivity = async (req, res) => {
    // Get Activity ID
    const act_id = req.params.id;

    try{

        const activity = await activityServices.getActivity(act_id);

        // Check if Activity Was Found
        if(activity.length === 0){
            return res.status(404).json({message: "Activity Not Found."});
        }
        return res.status(200).json(activity);
    }
    catch(err){
        console.error("Error When Fetching Activity: ", err);
        return res.status(500).json({message: "Internal Server Error."});
    }
};

const addActivity = async (req, res) => {

    // Grab user id from url
    const user_id = req.params.user_id;

    //Check that all fields are filled out
    if(!Object.values(req.body).every(value => value)){
        return res.status(400).json({message: "Missing Required Fields."});
    }

    try{    
        await activityServices.addActivity(...Object.values(req.body),user_id);
        res.status(201).json({message: "Activity Added Successfully!"});
    }
    catch(err){
        console.error("Error When Adding Activity: ", err);
        return res.status(500).json({message: "Internal Server Error."});
    }


};

const updateActivity = async (req, res) => {

    //Grab Activity ID from url
    const act_id = req.params.id;

    //check that all fields are field out
    if(!Object.values(req.body).every(field => field)){
        return res.status(400).json({message: "Missing Required Fields."});
    }

    try{
        const { act_date, duration, comments } = req.body;

        const activity = await activityServices.updateActivity(act_date, duration, comments, act_id);

        if(activity.affectedRows === 0){
            return res.status(404).json({message: "Activity Not Found."});
        }

        res.status(200).json({message: "Activity Updated Successfully!"});
    }
    catch(err){
        console.error("Error When Adding Activity: ", err);
        return res.status(500).json({message: "Internal Server Error."});
    }


};

const deleteActivity = async (req, res) => {
    // Grab activity Id from url
     const id = req.params.id;

     try{    
        const activity = await activityServices.deleteActivity(id);

        if(activity.affectedRows === 0){
            return res.status(404).json({message: "Activity Not Found."});
        }

        res.status(200).json({message: "Activity Deleted Successfully!"});
    }
    catch(err){
        console.error("Error When Adding Activity: ", err);
        return res.status(500).json({message: "Internal Server Error."});
    }
     
};

export default{
    getActivity,
    addActivity,
    updateActivity,
    deleteActivity
}
