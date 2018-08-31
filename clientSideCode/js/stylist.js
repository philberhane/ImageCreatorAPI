/*if (!sessionStorage.id) {
// similar behavior as clicking on a link
window.location.href = "login.html";
} 

if (sessionStorage.role !== 'stylist') {
 if (sessionStorage.role) {
    window.location.href = sessionStorage.role + ".html";
    } else {
        window.location.href = "login.html"; 
    }    
}

*/

// Do an onlick (this.id) so that when clicked, the big div's img src becomes the clicked div
function dope() {
    console.log('dope')
}




// Basically create images for each number, and make the big image the first image's src


var input = {}
fetch('https://lisathomasapi.herokuapp.com/routes/images/getImages', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
    
    if (data.message.indexOf('Error') === 0) {
        document.getElementById('sliderDiv').innerText = data.message
    } else {
        for (i=0; i<data.message.length; i++) {
            var image = document.createElement('img')
            image.src = data.message[i].imageLink
            image.style.width = '100%'
           image.id = data.message[i]._id
            image.title = data.message[i].imageLink
            image.alt = data.message[i].status
            image.className = 'img-fluid img-thumbnail'
            image.setAttribute('onclick', 'selectImg(this.id)')
            
            
            var div = document.createElement('div')
            var h3 = document.createElement('h3')
            var span = document.createElement('span')
           
            
            
            if (data.message[i].status === 'active') {
            
            span.appendChild(image)
            div.appendChild(span)
            
            document.getElementById('sliderNav').appendChild(div)
                
            } 
        }
        
       

 $('.slider-nav')
 	.on('init', function(event, slick) {
 		$('.slider-nav .slick-slide.slick-current').addClass('is-active');
     
 	})
 	.slick({
 		slidesToShow: 7,
 		slidesToScroll: 7,
 		dots: false,
 		focusOnSelect: false,
 		infinite: false,
 		responsive: [{
 			breakpoint: 1024,
 			settings: {
 				slidesToShow: 5,
 				slidesToScroll: 5,
 			}
 		}, {
 			breakpoint: 640,
 			settings: {
 				slidesToShow: 4,
 				slidesToScroll: 4,
			}
 		}, {
 			breakpoint: 420,
 			settings: {
 				slidesToShow: 7,
 				slidesToScroll: 7,
		}
 		}]
     
     
 	});
        
        document.getElementById('mainImg').src = document.getElementById('sliderNav').firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.src
    
          } 
    
        })








function uploadImg() {
    document.getElementById('imgLoader').click()
}

var arrayOfCanvas = []

function next() {
    
    document.getElementById('selectImgDiv').style.display = 'none'
    document.getElementById('selectCopyDiv').style.display = 'block'
    document.getElementById('imageLink').value = document.getElementById('mainImg').src
    fetch('https://lisathomasapi.herokuapp.com/routes/copy/getCopy', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
    
    if (data.message.indexOf('Error') === 0) {
        document.getElementById('sliderDiv2').innerText = data.message
    } else {
        for (i=0; i<data.message.length; i++) {
            
            
            var image = document.createElement('img')
            image.src = data.message[i].imageLink
            image.style.width = '100%'
           image.id = data.message[i]._id
            image.title = data.message[i].canvasLink
            image.alt = data.message[i].status
            image.className = 'img-fluid img-thumbnail copyResults'
            image.setAttribute('onclick', 'selectCopy(this.id)')
            
            
            arrayOfCanvas.push(data.message[i].canvasLink)
            
            var div = document.createElement('div')
            var h3 = document.createElement('h3')
            var span = document.createElement('span')
           
            
            
            if (data.message[i].status === 'active') {
            
            span.appendChild(image)
            div.appendChild(span)
            
            document.getElementById('sliderNav2').appendChild(div)
                
            } 
    
          } 
     $('.slider-nav2')
 	.on('init', function(event, slick) {
 		$('.slider-nav2 .slick-slide.slick-current').addClass('is-active');
     
 	})
 	.slick({
 		slidesToShow: 7,
 		slidesToScroll: 7,
 		dots: false,
 		focusOnSelect: false,
 		infinite: false,
 		responsive: [{
 			breakpoint: 1024,
 			settings: {
 				slidesToShow: 5,
 				slidesToScroll: 5,
 			}
 		}, {
 			breakpoint: 640,
 			settings: {
 				slidesToShow: 4,
 				slidesToScroll: 4,
			}
 		}, {
 			breakpoint: 420,
 			settings: {
 				slidesToShow: 7,
 				slidesToScroll: 7,
		}
 		}]
     
     
 	});
        
        document.getElementById('mainCopy').src = document.getElementById('sliderNav2').firstElementChild.nextElementSibling.firstElementChild.firstElementChild.src
    
          } 
    
        }) 
    document.getElementById('hidden').style.display = 'block'
    

    
    canvasFunction()
}

function selectCopy(clicked_id) {
    var clickedCopy = document.getElementById(clicked_id)
    canvas.loadFromDatalessJSON(clickedCopy.title)
    canvas.renderAll()
}

function selectImg(clicked_id) {
    var clickedImg = document.getElementById(clicked_id)
    document.getElementById('mainImg').src = clickedImg.src
}

var imgObj = new Image();
var fabricImage = new fabric.Image(imgObj);

function selectImage() {
    var array = document.querySelectorAll('.mySlides')
    document.getElementById('reset').style.display = 'block'
    for (i=0;i<array.length;i++) {
        if (array[i].style.display === 'block') {
            document.getElementById('imageId').value = array[i].id
            document.getElementById('uploadDiv').style.display = 'none'
            
            //canvas.setActiveObject(text)
            
            document.getElementById('image').style.display = 'block'
            document.getElementById('image').src = array[i].title
           
            imgObj.crossOrigin = 'anonymous'
            imgObj.src = array[i].title;
        
 
            
            canvas.loadFromDatalessJSON(array[i].alt)
            canvas._objects[0].on('selected', function() {
    canvas.allowTouchScrolling = false
    
    console.log('selected')
})
            imgObj.onload = function () {
            // start fabricJS stuff
            
            
           
                

          
            canvas.setHeight(document.getElementById('image').height);
            canvas.setWidth(document.getElementById('image').width);
            //image.scale(getRandomNum(0.1, 0.25)).setCoords();
                
         
                
          //      canvas._objects.shift()
            canvas.renderAll.bind(canvas);
            
            // end fabricJS stuff
        }
            document.getElementById('hidden').style.display = 'block'
            document.getElementById('eImage').style.display = 'none'
            document.getElementById('submitChanges').style.display = 'block'
            
            document.getElementById('image').style.visibility = 'hidden'
        }
    }
    
    
    
    
}


function reset() {
window.location.href = 'stylist.html'
}


function logout() {
    delete sessionStorage.id
    delete sessionStorage.images
    delete sessionStorage.role
    window.location.href = "login.html";
}


 canvas = new fabric.Canvas('canvas',
            {
        selection : false,
        controlsAboveOverlay:true,
        centeredScaling:true,
        allowTouchScrolling: true
    }                  
   )

var text = new fabric.IText('', {});

text.on('selected', function() {
    canvas.allowTouchScrolling = false
    
    console.log('selected')
})

fabricImage.on('selected', function() {
canvas.deactivateAll().renderAll();
    fabricImage.lockMovementX = true;
    fabricImage.lockMovementY = true;
    canvas.allowTouchScrolling = true;
})
    
canvas.on('selection:cleared', function() {
    fabricImage.lockMovementX = true;
    fabricImage.lockMovementY = true;
    canvas.allowTouchScrolling = true
    console.log('unselected')
   
})

 


function canvasFunction() {
    

    
    
 
        document.getElementById('hidden').style.display = 'block'
    
    
    var link = document.getElementById('imageLink').value
   
    
       
         document.getElementById('image').style.display = 'block' 
    
    
        document.getElementById('image').src = link
            imgObj.crossOrigin = 'anonymous'
             imgObj.src = link
            
        
                              
        imgObj.onload = function () {
            document.getElementById('loading').innerText = ''
            canvas.setHeight(document.getElementById('image').height);
            canvas.setWidth(document.getElementById('image').width);
            // start fabricJS stuff
     //   document.getElementById('editDiv').style.display = 'none'
      //   document.getElementById('loader2').style.display = 'none'   
           
            
            canvas.setBackgroundImage(new fabric.Image(imgObj, {
                scaleX: canvas.width / imgObj.width,
               scaleY: canvas.height / imgObj.height
            }));
            var copyArray = document.querySelectorAll('.copyResults')
            
            
           // canvas.add(text)
        //    canvas.loadFromDatalessJSON(arrayOfCanvas[0])
            canvas.add(text)
            canvas.renderAll.bind(canvas);
            // end fabricJS stuff
            

    document.getElementById('submit').style.display = 'block'
            document.getElementById('image').style.visibility = 'hidden'
            
        }
        
      /*  var copyArray = document.querySelectorAll('.copyResults')
        
        console.log(copyArray)
        
        canvas.loadFromJSON(copyArray[0].title) */
        
     
  //  document.body.append(canvas.toDataURL())
     canvas.loadFromDatalessJSON(arrayOfCanvas[0])
         canvas.renderAll()
}


function canvasFunction1() {
    
 
        

    
    var link = document.getElementById('imageLink').value
   
    console.log('1')
    
       
         document.getElementById('image').style.display = 'block' 
    
    
        document.getElementById('image').src = link
            imgObj.crossOrigin = 'anonymous'
             imgObj.src = link
            
        
                              
        imgObj.onload = function () {
            document.getElementById('loading').innerText = ''
            canvas.setHeight(document.getElementById('image').height);
            canvas.setWidth(document.getElementById('image').width);
            console.log('2')
            // start fabricJS stuff
     //   document.getElementById('editDiv').style.display = 'none'
      //   document.getElementById('loader2').style.display = 'none'   
           
            canvas.setBackgroundImage(new fabric.Image(imgObj, {
                scaleX: canvas.width / imgObj.width,
               scaleY: canvas.height / imgObj.height
            }));
            canvas.add(text);
            canvas.renderAll.bind(canvas);
            // end fabricJS stuff
            document.getElementById('hidden').style.display = 'block'

    document.getElementById('submit').style.display = 'block'
            document.getElementById('image').style.visibility = 'hidden'
            
        }
        
    
  //  document.body.append(canvas.toDataURL())
    
}







function changeFont() {
    canvas._objects[0].setFontFamily(document.getElementById('fontSelect').value)
    canvas.setActiveObject(text)
    canvas.renderAll();
}



                                    


function finishEdit() {
  //  canvas.deactivateAll().renderAll();
    document.getElementById('imageLocation').style.display = 'block'
    
    document.getElementById('hidden').style.display = 'none'
   // document.getElementById('finishEdit').style.display = 'none'
    
    
    
   
   var dataURL = document.querySelector('#canvas').toDataURL();
     document.getElementById('imageLocation').src = dataURL;  
    
       document.getElementById('canvas').style.display = 'none'
       document.querySelector('.upper-canvas').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'

    
}



//Apply violence to the stupid hidden input stuff to make iOS show the keyboard

(function(){
    var __initHiddenTextarea = window.fabric.IText.prototype.initHiddenTextarea;

    function initHiddenTextarea(){
        this.hiddenTextarea = fabric.document.createElement('textarea');

        this.hiddenTextarea.setAttribute('autocapitalize', 'off');
        this.hiddenTextarea.style.cssText = 'position: absolute; opacity: 0; font-size: 10pt;' +
                                            ' left: -9999px; width: 8888px; height: 10px; z-index: -999;';
        if (this.canvas && this.canvas.wrapperEl) {
            this.canvas.wrapperEl.appendChild(this.hiddenTextarea);

            this.on('event:scaling', this.canvas.updateHiddenTextareaPosition.bind(this.canvas));
            this.on('event:moving', this.canvas.updateHiddenTextareaPosition.bind(this.canvas));
            this.canvas.updateHiddenTextareaPosition();
        } else {
            fabric.document.body.appendChild(this.hiddenTextarea);
        }

        //This was in the original initHiddenTextarea
        fabric.util.addListener(this.hiddenTextarea, 'keydown', this.onKeyDown.bind(this));
        fabric.util.addListener(this.hiddenTextarea, 'keypress', this.onKeyPress.bind(this));
        fabric.util.addListener(this.hiddenTextarea, 'copy', this.copy.bind(this));
        fabric.util.addListener(this.hiddenTextarea, 'paste', this.paste.bind(this));

        if (!this._clickHandlerInitialized && this.canvas) {
          fabric.util.addListener(this.canvas.upperCanvasEl, 'click', this.onClick.bind(this));
          this._clickHandlerInitialized = true;
        }
    }

    //We need to slap this on fabric, so that if we do something to change the position of the
    //textarea on the screen by e.g. resizing or zooming the canvas, we can move the hidden
    //textarea appropriately.
    function updateHiddenTextareaPosition() {
        //The text's bounding rectangle, IN CANVAS SPACE (not fabric logical coordinates)
        var itextObject = this.getActiveObject();
        if (itextObject && itextObject.isEditing) { //If not iText, will return false
            if (itextObject.hiddenTextarea.parentNode === this.wrapperEl) {
                var rect = itextObject.getBoundingRect();
                itextObject.hiddenTextarea.style.top = rect.top + 'px';
            }
        }
    }

    window.fabric.util.object.extend(window.fabric.IText.prototype, {
        initHiddenTextarea: initHiddenTextarea,
    });

    window.fabric.util.object.extend(window.fabric.Canvas.prototype, {
        updateHiddenTextareaPosition: updateHiddenTextareaPosition,
    });
})(); 

/*$('input[type=file]').on("click", function() {
     //    document.getElementById('loader2').style.display = 'block'
     }) */
$("document").ready(function() {
    
  $('input[type=file]').on("click", function() {
      document.getElementById('loading').innerText = "Uploading file.." 
  })
    
})


$("document").ready(function() {
    
  $('input[type=file]').on("change", function() {

    var $files = $(this).get(0).files;

    if ($files.length) {

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 10024) {
        console.log("Please select a smaller file");
        return false;
      }

      // Begin file upload
     

      // Replace ctrlq with your own API key
      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = '314fcaf93f5188b';

      var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: 'Client-ID ' + apiKey,
          Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
      };

      var formData = new FormData();
      formData.append("image", $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function(response) {
          console.log('uploaded!')
          var link = JSON.parse(response).data.link
        document.getElementById('imageLink').value = link
          
          
           next()
       
      });
    }
  });
    
    
 
    
});



function submitChanges() {
   //     document.getElementById('loader1').style.display = 'block'

try {
    var img = document.getElementById('canvas').toDataURL('image/jpeg', 0.9).split(',')[1];
} catch(e) {
    var img = document.getElementById('canvas').toDataURL().split(',')[1];
} 
    
    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        headers: {
            Authorization: 'Client-ID ' + '314fcaf93f5188b'
        },
        data: {
            image: img
        },
        dataType: 'json',
        success: function(response) {
            if(response.success) {
               // Post the imgur url to your server.
               console.log(response.data.link)
                document.getElementById('imageCopyLink').value = response.data.link
                
       //         sendToServerUpdate()
            }
        }
    }); 
}


function test() {
    document.getElementById('img').setAttribute('src', document.getElementById('imageLink').value)
}

function emailImagePopup() {
    // Get the modal
var modal = document.getElementById('myModal2');
modal.style.display = "block";
// Get the button that opens the modal
var cancel = document.getElementById("cancelEmail");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close2")[0];


    document.getElementById('modalPic2').src = document.getElementById('finalImage').src


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

cancel.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}


function emailImage() {
    
    const input = {
        source : document.getElementById('finalImage').src,
        email : document.getElementById('emailValue').value
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/images/emailImage', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        document.getElementById('stylistMessage').style.display = 'block'
        document.getElementById('stylistMessage').innerText = 'Your email has been sent!'
        
        })
    
    
    
}


// Maybe for their own
function deleteImage() {
    
    var array = document.querySelectorAll('.mySlides')
    for (i=0;i<array.length;i++) {
        if (array[i].style.display === 'block') {
            document.getElementById('imageId').value = array[i].id
        }
    }
    
    const input = {
        id : document.getElementById('imageId').value
       
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/images/deleteImage', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        
        })
window.location.href = 'adminmessage.html'
    
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("IGPopUp");

var cancel = document.getElementById("cancelDeletion");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    document.getElementById('modalPic').src = document.getElementById('finalImage').src
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

cancel.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function save() {
    canvas.deactivateAll().renderAll();
    document.getElementById('submit').style.display = 'none'
    document.getElementById('reset').style.display = 'none'
    document.getElementById('hiddenArea').style.display = 'block'
    
    
}

function saveChanges() {
    document.getElementById('saving').innerText = 'Saving...'
   // canvas.deactivateAll().renderAll();
  //  document.getElementById('loader1').style.display = 'block'
    try {
    var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
} catch(e) {
    var img = canvas.toDataURL().split(',')[1];
} 
    
    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        headers: {
            Authorization: 'Client-ID ' + '314fcaf93f5188b'
        },
        data: {
            image: img
        },
        dataType: 'json',
        success: function(response) {
            if(response.success) {
               // Post the imgur url to your server.
               console.log(response.data.link)
                document.getElementById('finalImage').setAttribute('src', response.data.link)
                document.getElementById('canvas').style.display = 'none'
    document.querySelector('.upper-canvas').style.display = 'none'
    document.querySelector('.canvas-container').style.display = 'none'
    document.getElementById('submitChanges').style.display = 'none'
    document.getElementById('reset').style.display = 'none'
    document.getElementById('hiddenArea').style.display = 'block'
     document.getElementById('saving').innerText = ''          
                document.getElementById('hidden').style.display = 'none'
                document.getElementById('submit').style.display = 'none'
                
                document.getElementById('selectCopyDiv').style.display = 'none'
                document.getElementById('submitChanges').style.display = 'none'
       //         sendToServerUpdate()
            }
        }
    }); 
//    document.getElementById('loader1').style.display = 'none'
    
}

function saveToDevice() {
    window.open(document.getElementById('finalImage').src); 
}

function fbs_click() {
    var TheImg = document.getElementById('finalImage')
     u=TheImg.src;
     // t=document.title;
    t=TheImg.getAttribute('alt');
    window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
}

function sendToIG() {
    // Go to Users
    // Use src, userId, and caption as input
    // query for the user using userId
    // get the user's IG user+pass
    // use private API to upload using user, pass, src + readstream, and caption
    
    const input = {
        id : sessionStorage.id,
        caption : document.getElementById('textArea').value,
        source : document.getElementById('finalImage').src,
        rs : document.getElementById('finalImage').src.split('.com/')[1]
       
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/users/uploadIG', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        document.getElementById('myModal').style.display = 'none'
        if (data.message === 'Success') {
        document.getElementById('myModal').style.display = 'none'
        document.getElementById('stylistMessage').style.display = 'block'
        document.getElementById('stylistMessage').innerText = 'Your image has been posted!'
        }
        })
    
}