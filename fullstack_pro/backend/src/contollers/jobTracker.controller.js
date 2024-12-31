import JobTracker from "../models/jobTraker.model.js";


const selectRound = async (req, res) => {
    const { roundName, studentIds, jobTrackerId } = req.body;

    // Validate roundName
    const validRounds = [
        "resumeSelect",
        "firstRound",
        "secondRound",
        "thirdRound",
        "fourthRound",
        "finalRound",
    ];
    if (!validRounds.includes(roundName)) {
        return res.status(400).json({ message: "Invalid round name specified." });
    }

    try {
        // Retrieve the JobTracker document
        const jobTracker = await JobTracker.findById(jobTrackerId);
        if (!jobTracker) {
            return res.status(404).json({ message: "JobTracker not found" });
        }

        // Update the specified round with the selected IDs
        jobTracker[roundName] = studentIds;
        // Clear IDs from all subsequent rounds after the updated round
        const nextRoundIndex = validRounds.indexOf(roundName) + 1;
        for (let i = nextRoundIndex; i < validRounds.length; i++) {
            jobTracker[validRounds[i]] = [];
        }
        await jobTracker.save();

        if(jobTracker.resumeSelect.length == 0){
            jobTracker.resumeRoundCompleted = false;
        }else{
            jobTracker.resumeRoundCompleted = true;
        }
        if(jobTracker.firstRound.length == 0){
            jobTracker.firstRoundCompleted = false;
        }else{
            jobTracker.firstRoundCompleted = true;
        }
        if(jobTracker.secondRound.length == 0){
            jobTracker.secondRoundCompleted = false;
        }else{
            jobTracker.secondRoundCompleted = true;
        }
        if(jobTracker.thirdRound.length == 0){
            jobTracker.thirdRoundCompleted = false;
        }else{
            jobTracker.thirdRoundCompleted = true;
        }
        if(jobTracker.fourthRound.length == 0){
            jobTracker.fourthRoundCompleted = false;
        }else{
            jobTracker.fourthRoundCompleted = true;
        }

        // // Clear IDs from all subsequent rounds after the updated round
        // const nextRoundIndex = validRounds.indexOf(roundName) + 1;
        // for (let i = nextRoundIndex; i < validRounds.length; i++) {
        //     jobTracker[validRounds[i]] = [];
        // }

        // // Define the rounds to check (from resumeSelect to fourthRound)
        // const checkRounds = [
        //     "resumeSelect",
        //     "firstRound",
        //     "secondRound",
        //     "thirdRound",
        //     "fourthRound"
        // ];

        // // Check each round (resumeSelect to fourthRound) for empty studentIds
        // checkRounds.forEach(round => {
        //     if (jobTracker[round].length === 0) {
        //         // Set the corresponding round tracker to false if the array is empty
        //         const roundCompletedFlag = `${round}Completed`;
        //         jobTracker[roundCompletedFlag] = false;
        //     } else {
        //         // Set the corresponding round tracker to true if the array is not empty
        //         const roundCompletedFlag = `${round}Completed`;
        //         jobTracker[roundCompletedFlag] = true;
        //     }
        // });

        

        // Save the updated JobTracker document
        await jobTracker.save();

        return res.status(200).json({
            message: `${roundName} updated successfully.`,
            updatedJobTracker: jobTracker,
        });
    } catch (error) {
        console.error("Error updating JobTracker:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};





const getJobTrackerDetails = async (req, res) => {
    const { jobTrackerId } = req.params;

    try {
        const jobTracker = await JobTracker.findById(jobTrackerId).populate("jobDetails").lean();

        if (!jobTracker) {
            return res.status(200).json({ message: `JobTracker not found id = ${jobTrackerId}` });
        }

        res.status(200).json(jobTracker);
    } catch (error) {
        console.error("Error fetching JobTracker details:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const createJobTrackor  = async (req, res) => {
    const { jobId, password, jobDetails } = req.body;

    try {
        // Create a new JobTracker instance
        const newJobTracker = new JobTracker({
            jobId,
            password,
            jobDetails
        });

        // Save the JobTracker to the database
        await newJobTracker.save();

        // Return a success response
        res.status(201).json({ message: 'Job Tracker added successfully!', data: newJobTracker });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving Job Tracker', error: error.message });
    }
}

export{selectRound,getJobTrackerDetails,createJobTrackor}
