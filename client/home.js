Template.gifmaker.events({
    'change input': function(ev) {
        _.each(ev.target.files, function(file) {
            Meteor.saveFile(file, file.name, ev.originalEvent.currentTarget.id);
        });
    }
});


$( document ).ready(function() {
    //Drag and Drop methods
    //prevent default
    $( "#dropDiv" ).bind( "dragover dragenter", function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    //drop image event handled here
    $( "#dropDiv" ).bind("drop", function(e) {
        var dataTransfer =  e.originalEvent.dataTransfer;
        if( dataTransfer && dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            var filetypecheck_allok = true;
            $.each( dataTransfer.files, function(i, file) {
                if(file.type.match('image.*')){
                    var val = false;
                    for(let key in images){
                        if(images[key]==""){
                            images[key]=file;
                            $("#"+key).hide()
                            val=true;
                            Meteor.saveFile(file, file.name,key);  
                            var reader = new FileReader();
                            
                            //show image in the box and hide one onf the input choose file
                            reader.onload = $.proxy(
                                function(file, $imgList, event) {
                                    var img = file.type.match('image.*') ? "<img src='" + event.target.result + "' /> " : "";
                                    $imgList.prepend( $("<li>").append( img + file.name ) );
                                }, this, file, $("#imgList"));
                            reader.readAsDataURL(file);
                            break;
                        }
                    }
                    if(!val){
                        alert("Only 5 files can be uploaded at a time");
                    }
                }
                else{
                    filetypecheck_allok=false;
                }
            });
            
            if(!filetypecheck_allok){
                alert("Some of the dragged files are not supported, only image files are accepted");
            }
        }
    });
    
    $("#resetButton").bind("click",function(e){
        //empty the image list
        $("#imgList").html("");
        
        //reset milliSeconds Value
        $("#milliSeconds").val("");
        
        //clear the image list variable
        for(let key in images){
            images[key]="";
            //show input divs
            $("#"+key).show();
            //clear all input fields
            document.getElementById(key).getElementsByTagName("input")[0].value="";
        }
        
    });
    
    $("#submitButton").bind("click",function(e){
        //get the milliseconds value 
        var milliSeconds = $("#milliSeconds").val();
        
        if(milliSeconds!=null && milliSeconds!=undefined && milliSeconds!="" && !isNaN(milliSeconds) && milliSeconds>0){
            //create an empty array, to store the base64 image strings
            var imgArr =  [];
            for(let key in images){
                if(images[key]!=""){
                    imgArr.push(images[key]);
                }
            }
            
            if(imgArr.length==0){
                alert("Please upload images");  
            }
            else{
                //create gif using base64 image array 
                Meteor.makeGifFromBase64Image(imgArr,milliSeconds,
                    //callback function from the Meteor.makeGifFromBase64Image method                              
                    function(obj) {
                        if(!obj.error) {
                            $("#gifCreatedHere").html("");
                            var image = obj.image,
                            animatedImage = document.createElement('img'),
                            downloadLink = document.createElement('a')
                            breakpoint = document.createElement('br');
                            animatedImage.src = image;
                            downloadLink.href= image;
                            downloadLink.download="file.gif";
                            downloadLink.innerHTML="download";
                            var htmlString = breakpoint+breakpoint+animatedImage+breakpoint+downloadLink+breakpoint;
                            $("#gifCreatedHere").append(animatedImage);
                            $("#gifCreatedHere").append(breakpoint);
                            $("#gifCreatedHere").append(breakpoint);
                            $("#gifCreatedHere").append(downloadLink);
                            $("#resetButton").click();
                        }
                    }
                );
            }
        }
        else{
            alert("Input a valid milliSeconds value");  
        }
    });
});
