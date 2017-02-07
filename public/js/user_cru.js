$(function(){
  $('input[type=file]').on('change', function(event){
    files = event.target.files;
    console.log(files)
    var img = document.createElement("IMG");
    img.setAttribute("src", URL.createObjectURL(files[0]));

    var div = document.createElement("DIV");
    div.setAttribute("class", "thumb");
    div.appendChild(img);
    
    document.getElementById("image-upload").innerHTML = '';
    document.getElementById("image-upload").appendChild(div);
  });


});