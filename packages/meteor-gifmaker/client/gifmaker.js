Meteor.makeGifFromBase64Image = function(imgArr,milliSeconds,callback){
    //create gif using base64 image array 
    gifshot.createGIF({'images': imgArr,'interval': 0.001 * milliSeconds},callback);
}
