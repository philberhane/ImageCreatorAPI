if (!sessionStorage.id) {
// similar behavior as clicking on a link
window.location.href = "login.html";   
}
if (sessionStorage.role !== 'admin') {
    if (sessionStorage.role) {
    window.location.href = sessionStorage.role + ".html";
    } else {
        window.location.href = "login.html"; 
    }
}

console.log('admin')
var input = {}
fetch('https://lisathomasapi.herokuapp.com/routes/images/getImages', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
    
    if (data.message.indexOf('Error') === 0) {
        document.getElementById('slideshow').innerText = data.message
    } else {
        for (i=0; i<data.message.length; i++) {
            var image = document.createElement('img')
            image.src = data.message[i].imageCopyLink
            image.className = 'mySlides'
            image.style.width = '100%'
           image.id = data.message[i]._id
            image.title = data.message[i].imageLink
            image.alt = data.message[i].canvasLink
            document.getElementById('slideshow').appendChild(image)
            
        }
    showDivs(slideIndex);
          } 
        })

var slideIndex = 1;

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
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
window.location.href = 'admin.html'}


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

var text = new fabric.IText('Add Text', {});

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
        document.getElementById('editDiv').style.display = 'none'
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
}); 

/*$('input[type=file]').on("click", function() {
  //       document.getElementById('loader2').style.display = 'block'
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
           canvasFunction()
       
      });
    }
  });
    
    
 
    
});

function submit() {
    document.getElementById('saving').innerText = 'Saving...'
  //  document.body.append(canvas.toDataURL())
  //  canvas.deactivateAll()
 //   document.getElementById('loader1').style.display = 'block'

    try {
        var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
    } catch(e) {
        var img = canvas.toDataURL().split(',')[1];
    }
  //  document.body.append(canvas.toDataURL())

    console.log(img)
  //  document.body.append('Uploading file to Imgur..')
 console.log("Uploading file to Imgur..");

      // Replace ctrlq with your own API key
  

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
            //    document.body.append('loading')
                sendToServer()
            }
        }
    }); 
    
    };


function submitChanges() {
    document.getElementById('saving').innerText = 'Saving...'
   // canvas.deactivateAll().renderAll();
 //       document.getElementById('loader1').style.display = 'block'

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
                document.getElementById('imageCopyLink').value = response.data.link
                
                sendToServerUpdate()
            }
        }
    }); 
}


function test() {
    document.getElementById('img').setAttribute('src', document.getElementById('imageLink').value)
}


function sendToServer() {
    
    var input = {
        imageLink : document.getElementById('imageLink').value,
        imageCopyLink : document.getElementById('imageCopyLink').value,  
        canvasLink : JSON.stringify(canvas)
    }
 //   document.body.append('about to send to server')
    
    fetch('https://lisathomasapi.herokuapp.com/routes/images/addImage', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        
        window.location.href = 'adminmessage.html'
        
        })

    
}

function sendToServerUpdate() {
    
    const input = {
        id : document.getElementById('imageId').value,
        imageCopyLink : document.getElementById('imageCopyLink').value,  
        canvasLink : JSON.stringify(canvas)
    }
    
    console.log(input.id)
    
    fetch('https://lisathomasapi.herokuapp.com/routes/images/updateImage', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        window.location.href = 'adminmessage.html'
        })

    
}

function deleteImage() {
    document.getElementById('myModal').style.display = 'none'
    //document.getElementById('cancelDeletion').click()
    
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
        if (data.message === 'Success') {
        window.location.href = 'adminmessage.html'
        }
        })

    
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("deleteImage");

var cancel = document.getElementById("cancelDeletion");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
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