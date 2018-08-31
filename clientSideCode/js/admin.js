/*if (!sessionStorage.id) {
// similar behavior as clicking on a link
window.location.href = "login.html";   
}
if (sessionStorage.role !== 'admin') {
    if (sessionStorage.role) {
    window.location.href = sessionStorage.role + ".html";
    } else {
        window.location.href = "login.html"; 
    }
} */

function redirect(t) {
    if (t === 'logout') {
        delete sessionStorage.id
    delete sessionStorage.images
    delete sessionStorage.role
    window.location.href = "login.html";
    } else {
        window.location.href = t
    }
}


        if ($(window).width() <= 616) {
     var select = document.createElement('select')
        select.id = 'navSelect'
        var option1 = document.createElement('option')
        option1.value = 'admin.html'
        option1.innerText = 'DASHBOARD'
            
        var option2 = document.createElement('option')
        option2.value = 'users.html'
        option2.innerText = 'USERS'
            
        var option3 = document.createElement('option')
        option3.value = 'logout'
        option3.innerText = 'LOGOUT'
        
        select.appendChild(option1)
        select.appendChild(option2)
        select.appendChild(option3)
        select.setAttribute('onchange', 'redirect(this.value)')
        document.getElementById('hideTho').innerHTML = ''
        document.getElementById('hideTho').appendChild(select)
  }
 else {
    document.getElementById('hideTho').innerHTML = ''
     var anchor1 = document.createElement('a')
     anchor1.id = 'loginNav'
     anchor1.setAttribute('href', 'admin.html')
     anchor1.innerText = 'Dashboard'
     var anchor2 = document.createElement('a')
     anchor2.id = 'signupNav'
     anchor2.setAttribute('href', 'users.html')
     anchor2.innerText = 'Users'
     var anchor3 = document.createElement('a')
     anchor3.id = 'logoutNav'
     anchor3.setAttribute('onclick', 'logout()')
     anchor3.innerText = 'Logout'
     document.getElementById('hideTho').appendChild(anchor1)
     document.getElementById('hideTho').appendChild(anchor2)
     document.getElementById('hideTho').appendChild(anchor3)
 }
        
        $(window).resize(function() {
  if ($(window).width() <= 616) {
     var select = document.createElement('select')
        select.id = 'navSelect'
        var option1 = document.createElement('option')
        option1.value = 'admin.html'
        option1.innerText = 'DASHBOARD'
        var option2 = document.createElement('option')
        option2.value = 'users.html'
        option2.innerText = 'USERS'
      var option3 = document.createElement('option')
        option3.value = 'logout'
        option3.innerText = 'LOGOUT'
        select.appendChild(option1)
        select.appendChild(option2)
      select.appendChild(option3)
        select.setAttribute('onchange', 'redirect(this.value)')
        document.getElementById('hideTho').innerHTML = ''
        document.getElementById('hideTho').appendChild(select)
  }
 else {
    document.getElementById('hideTho').innerHTML = ''
     var anchor1 = document.createElement('a')
     anchor1.id = 'loginNav'
     anchor1.setAttribute('href', 'admin.html')
     anchor1.innerText = 'Dashboard'
     var anchor2 = document.createElement('a')
     anchor2.id = 'signupNav'
     anchor2.setAttribute('href', 'users.html')
     anchor2.innerText = 'Users'
     var anchor3 = document.createElement('a')
     anchor3.id = 'logoutNav'
     anchor3.setAttribute('onclick', 'logout()')
     anchor3.innerText = 'Logout'
     document.getElementById('hideTho').appendChild(anchor1)
     document.getElementById('hideTho').appendChild(anchor2)
     document.getElementById('hideTho').appendChild(anchor3)
 }
});
    


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
        console.log(data.message)
        document.getElementById('activeImageHeader').innerText += ' - none'
        
        document.getElementById('inactiveImageHeader').innerText += ' - none'
    } else {
        for (i=0; i<data.message.length; i++) {
            var image = document.createElement('img')
            image.src = data.message[i].imageLink
            image.style.width = '100%'
           image.id = data.message[i]._id
            image.title = data.message[i].imageLink
            image.alt = data.message[i].status
            image.className = 'img-fluid'
            image.setAttribute('onclick', 'selectImg(this.id)')
            var div = document.createElement('div')
            div.style.marginTop = '15px'
            div.className = 'col-md-3 col-sm-4 col-xs-6'
            div.appendChild(image)
            
            if (data.message[i].status === 'active') {
            
            document.getElementById('gallery1').appendChild(div)
            } else {
                document.getElementById('gallery2').appendChild(div)
            }
        }
        
        if (!document.getElementById('activeImageHeader').nextElementSibling) {
            document.getElementById('activeImageHeader').innerText += ' - none'
        }
        
        if (!document.getElementById('inactiveImageHeader').nextElementSibling) {
            document.getElementById('inactiveImageHeader').innerText += ' - none'
        }
    
          } 
        })



fetch('https://lisathomasapi.herokuapp.com/routes/copy/getCopy', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
    
    if (data.message.indexOf('Error') === 0) {
        console.log(data.message)
        document.getElementById('activeCopyHeader').innerText += ' - none'
        
        document.getElementById('inactiveCopyHeader').innerText += ' - none'
    } else {
        for (i=0; i<data.message.length; i++) {
            var image = document.createElement('img')
            image.src = data.message[i].imageLink
            image.style.width = '200%'
           image.id = data.message[i]._id
            image.title = data.message[i].canvasLink
            image.alt = data.message[i].status
            image.className = 'img-fluid img-thumbnail'
            image.setAttribute('onclick', 'selectCopy(this.id)')
            var div = document.createElement('div')
            div.style.marginTop = '15px'
            div.className = 'col-md-3 col-sm-4 col-xs-6'
            div.appendChild(image)
            
            if (data.message[i].status === 'active') {
            
            document.getElementById('gallery3').appendChild(div)
            } else {
                document.getElementById('gallery4').appendChild(div)
            }
        }
        
        if (!document.getElementById('activeCopyHeader').nextElementSibling) {
            document.getElementById('activeCopyHeader').innerText += ' - none'
        }
        
        if (!document.getElementById('inactiveCopyHeader').nextElementSibling) {
            document.getElementById('inactiveCopyHeader').innerText += ' - none'
        }
    
          } 
        })





function addCopySection() {
    document.getElementById('addCopy').appendChild(document.getElementById('hidden'))
    document.getElementById('saveButton').setAttribute('onclick', 'submit()')
    document.getElementById('addCopyButton').style.display = 'none'
    document.getElementById('hidden').style.display = 'block'
    canvas.add(text)
    
    
}


function addCopy() {
    
    const input = {
        imageLink : document.getElementById('imageCopyLink').value,
        canvasLink : JSON.stringify(canvas),
        status : 'active'
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/copy/addCopy', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        /*if (data.message === 'Success') {
        window.location.href = 'adminmessage.html'
        }*/
        console.log(data.message)
        })
    
}


function saveCopy() {
    
    const input = {
        imageLink : document.getElementById('imageCopyLink').value,
        canvasLink : JSON.stringify(canvas),
        id : document.getElementById('imageId').value
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/copy/saveCopy', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        /*if (data.message === 'Success') {
        window.location.href = 'adminmessage.html'
        }*/
        console.log(data.message)
        })
    
}



function selectImg(clicked_id) {
    console.log('dope')
    var clickedImg = document.getElementById(clicked_id)
    if (clickedImg.className === 'img-fluid selected') {
    clickedImg.className = 'img-fluid'
  //  console.log(clickedImg.className)
    } else {
        clickedImg.className += ' selected'
    }
    
   clickedImg.parentElement.parentElement.nextElementSibling.style.display = 'block'
    
    clickedImg.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = 'block'
    
    
  //   clickedImg.className += ' selected'
}

function selectCopy(clicked_id) {
    
    var clickedImg = document.getElementById(clicked_id)
    
    if (clickedImg.className === 'img-fluid img-thumbnail') {
   clickedImg.className += ' selected'
  //  console.log(clickedImg.className)
    } else {
        clickedImg.className += ' selected'
        clickedImg.className = 'img-fluid img-thumbnail'
    }
    
   clickedImg.parentElement.parentElement.nextElementSibling.style.display = 'block'
    
    clickedImg.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = 'block'
    
    clickedImg.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block'
    
  //   clickedImg.className += ' selected'
}

function changeImgStatus(clicked_id){
    
    var clickedButton = document.getElementById(clicked_id)
    
     var selectArray = document.querySelectorAll('.selected')
    
    var serverArray = []
    
    for (i=0;i<selectArray.length;i++) {
        if (selectArray[i].parentElement.parentElement.id === clickedButton.parentElement.firstElementChild.id) {
        serverArray.push(selectArray[i].id)
        }
    }
    
    var status
    
    if (clickedButton.innerText === 'Deactivate Selected Images') {
        status = 'inactive'
    } else {
        status = 'active'
    }
    
    const input = {
        imgArray : serverArray,
        status : status
       
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/images/updateImage', {
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

function editCanvas(clicked_id) {
    
    var clickedButton = document.getElementById(clicked_id)
    
     var selectArray = document.querySelectorAll('.selected')
     
     var canvasArray = []
    
     for (i=0;i<selectArray.length;i++) {
        if (selectArray[i].parentElement.parentElement.id === clickedButton.parentElement.firstElementChild.id) {
        canvasArray.push(selectArray[i])
        }
    }
    
    
    
//   canvas.setHeight('500px');
   //        canvas.setWidth('500px');
    
    clickedButton.parentElement.appendChild(document.getElementById('hidden'))
    
    document.getElementById('hidden').style.display = 'block'
    
    canvas.loadFromDatalessJSON(canvasArray[0].title)
    
    document.getElementById('imageId').value = canvasArray[0].id
    
    
    canvas.renderAll();
    
    canvas._objects[0].on('selected', function() {
    canvas.allowTouchScrolling = false
    
    console.log('selected')
})
    
}


function changeCopyStatus(clicked_id){
    
    var clickedButton = document.getElementById(clicked_id)
    
     var selectArray = document.querySelectorAll('.selected')
    
    var serverArray = []
    
    for (i=0;i<selectArray.length;i++) {
        if (selectArray[i].parentElement.parentElement.id === clickedButton.parentElement.firstElementChild.id) {
        serverArray.push(selectArray[i].id)
        }
    }
    
    var status
    
    if (clickedButton.innerText === 'Deactivate Selected Copy') {
        status = 'inactive'
    } else {
        status = 'active'
    }
    
    const input = {
        copyArray : serverArray,
        status : status
       
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/copy/updateCopyStatus', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
       /* if (data.message === 'Success') {
        window.location.href = 'adminmessage.html'
        }*/
        })
    
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
window.location.href = 'admin.html'
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
   /*   if ($files[0].size > $(this).data("max-size") * 10024) {
        console.log("Please select a smaller file");
        return false;
      } */

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
        
        console.log($files)
        var formData = new FormData();
        
        for (i=0; i<$files.length; i++) {

      
      formData.append("image", $files[i]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function(response) {
    //      console.log(JSON.parse(response).data)
          
          var newImg = document.createElement('input')
          newImg.style.display = 'none'
          newImg.className = 'newImg'
          newImg.value = JSON.parse(response).data.link
          document.body.appendChild(newImg)
          
        /*  var link = JSON.parse(response).data.link
        document.getElementById('imageLink').value = link
           canvasFunction() */
       
      }) }
    //    
        
        console.log(document.querySelectorAll('.newImg'))
        
        sendImageToServer()
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

 //   console.log(img)
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
              //  sendToServer()
                
                addCopy()
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
                
                saveCopy()
            }
        }
    }); 
}


function test() {
    document.getElementById('img').setAttribute('src', document.getElementById('imageLink').value)
}


function sendImageToServer() {
    var serverArray = []
    
    var imgArray = document.querySelectorAll('.newImg')
    
    for (i=0; i<imgArray.length;i++) {
        serverArray.push(imgArray[i].value)
    }
    
    var input = {
        imgArray : serverArray
    }
    
    
 //   document.body.append('about to send to server')
    
    fetch('https://lisathomasapi.herokuapp.com/routes/images/addImage', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data.message)
        window.location.href = 'adminmessage.html'
        
        })

    
}

function sendToServerUpdate() {
    
    const input = {
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
    var selectArray = document.querySelectorAll('.selected')
    
    var serverArray = []
    
    for (i=0;i<selectArray.length;i++) {
        if (selectArray[i].parentElement.parentElement.id === document.getElementById('deleteId').value) {
        serverArray.push(selectArray[i].id)
        }
    }
    
    const input = {
        imgArray : serverArray
       
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



function deleteCopy() {
    var selectArray = document.querySelectorAll('.selected')
    
    var serverArray = []
    
    for (i=0;i<selectArray.length;i++) {
        if (selectArray[i].parentElement.parentElement.id === document.getElementById('deleteId2').value) {
        serverArray.push(selectArray[i].id)
        }
    }
    
    console.log(selectArray)
    console.log(serverArray)
    
    const input = {
        copyArray : serverArray
       
    }
    
    fetch('https://lisathomasapi.herokuapp.com/routes/copy/deleteCopy', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json"}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
      /*  if (data.message === 'Success') {
        window.location.href = 'adminmessage.html'
        }*/
        })

    
}


// Get the modal
var modal = document.getElementById('myModal');

var modal2 = document.getElementById('myModal2');

// Get the button that opens the modal
var btn = document.getElementById("deleteImage");

var cancel = document.getElementById("cancelDeletion");

var cancel2 = document.getElementById("cancelDeletion2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
function displayModal(clicked_id) {
    var gallery = document.getElementById(clicked_id).parentElement.firstElementChild.id
    
    document.getElementById('deleteId').value = gallery
    modal.style.display = "block";
    
} 

function displayModal2(clicked_id) {
    var gallery = document.getElementById(clicked_id).parentElement.firstElementChild.id
    
    document.getElementById('deleteId2').value = gallery
    modal2.style.display = "block";
    
} 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

span2.onclick = function() {
    modal2.style.display = "none";
}

cancel.onclick = function() {
    modal.style.display = "none";
}

cancel2.onclick = function() {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}