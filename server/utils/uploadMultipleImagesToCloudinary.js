const cloudinary = require("cloudinary").v2

exports.uploadMultipleImagesToCloudinary = async(files, folder, height, quality) => {

    const options = {folder};

    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto"

    const uploadedPromises = files.map( (file) => {
        return cloudinary.uploader.upload(file.tempFilePath, options);
    })

    //if any one of the promise fails, then all will be rejected
    return await Promise.all(uploadedPromises);
}