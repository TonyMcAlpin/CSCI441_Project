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
    // Grab user id from URL
    const user_id = req.params.user_id;

    // Destructure the body to explicitly get fields
    const { act_date, activityDuration, comments } = req.body;

    // Check that all fields are filled out and valid
    if (!act_date || !activityDuration || !comments || isNaN(activityDuration)) {
        return res.status(400).json({ message: "Missing required fields or invalid data." });
    }

    try {
        // Call service to add the activity
        await activityServices.addActivity(act_date, activityDuration, comments, user_id);
        res.status(201).json({ message: "Activity Added Successfully!" });
    } catch (err) {
        console.error("Error when adding activity:", err);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};


const updateActivity = async (req, res) => {

    //Grab Activity ID from url
    const act_id = req.params.id;

    //check that all fields are filled out
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

const getAverageActivity = async (req, res) => {
    const { start_date, end_date } = req.query;
    const { user_id } = req.params;

    // Check if the dates are provided
    if (!start_date || !end_date) {
        return res.status(400).json({ message: "Please provide both start_date and end_date" });
    }


    try {
        const result = await activityServices.getAverageActivity(user_id, start_date, end_date);

        if (result.length > 0) {
            const average_duration = result[0].average_duration;
            res.status(200).json({ average_duration });
        } else {
            res.status(200).json({ average_duration: null });
        }
    } catch (err) {
        console.error("Error calculating average:", err);
        res.status(500).json({ message: "Error calculating average" });
    }
};

const getWeeklyTotalActivity = async (req, res) => {
    const { user_id } = req.params;
    const { week_start, week_end } = req.query;

    if (!week_start || !week_end) {
        return res.status(400).json({ message: "Missing week_start or week_end." });
    }

    try {
        const result = await activityServices.getWeeklyTotalActivity(user_id, week_start, week_end);
        const total_duration = result[0].total_duration || 0;
        res.status(200).json({ total_duration });
    } catch (err) {
        console.error("Error fetching weekly total:", err);
        res.status(500).json({ message: "Internal Server Error." });
    }
};


export default{
    getActivity,
    addActivity,
    updateActivity,
    deleteActivity,
    getAverageActivity,
    getWeeklyTotalActivity
}
