import mongoose from 'mongoose';
import { type } from 'os';

const Schema = mongoose.Schema;

const studentFullProfileSchema = new Schema(
    {
        studentDetails:{
            type:mongoose.Types.ObjectId,
            ref:"Student"
        },
        tenth:{
            type:Object
        },
        twelfth:{
            type:Object
        },
        // tenth:{
        //     "obtainedMarks":{
        //         type:String
        //     },
        //     "totalMarks":{
        //         type:String
        //     },
        //     "board":{
        //         type:String
        //     },
        //     "yearOfPassing":{
        //         type:String
        //     },
        //     "schoolName":{
        //         type:String
        //     }
        // },
        // twelfth:{
        //     "obtainedMarks":{
        //         type:String
        //     },
        //     "totalMarks":{
        //         type:String
        //     },
        //     "branch":{
        //          type:String
        //     },
        //     "yearOfPassing":{
        //         type:String
        //     },
        //     "schoolName":{
        //         type:String
        //     },
        //     "board":{
        //         type:String
        //     }

        // },
        // graduation:{
        //     "obtainedCgpa":{
        //         type:String
        //     },
        //     "totalCgpa":{
        //         type:String
        //     },
        //     "percentage":{
        //         type:String
        //     },
        //     "universityName":{
        //         type:String
        //     },
        //     "yearOfPassing":{
        //         type:String
        //     }
        // },
        // postGraduation:{
        //     "obtainedCgpa":{
        //         type:String
        //     },
        //     "totalCgpa":{
        //         type:String
        //     },
        //     "percentage":{
        //         type:String
        //     },
        //     "universityName":{
        //         type:String
        //     },
        //     "yearOfPassing":{
        //         type:String
        //     }
        // },
        graduation:{
            type:Object
        },
        postGraduation:{
            type:Object
        },
        cv:{
            type:String
        }

    }
)

const StudentFullProfile = mongoose.model("StudentFullProfile",studentFullProfileSchema);
export default StudentFullProfile;
