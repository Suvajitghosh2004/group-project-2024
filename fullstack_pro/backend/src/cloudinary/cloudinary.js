import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import { console } from 'inspector';
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET 
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        //console.log("clodname = ",process.env.CLOUDINARY_CLOUD_NAME)
        if(!localFilePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("File upload successfull url is = ",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary}