import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const studentSchema = new Schema(
    {
        studentMail : {
            type: String,
            required: true,
            unique: true
        },
        studentCode : {
            type: String,
            required: true
        },
        studentName : {
            type: String,
            required: true
        },
        password : {
            type:String,
            required: true
        },
        contactNumber : {
            type: String,
        },
        studentStream : {
            type: String,
            required:true
        }

    }
)

const Student = mongoose.model("Student",studentSchema);

export default Student;
