$(function(){
  $('input[type=file]').on('change', function(event){
    files = event.target.files;
    console.log(files);
    var img = document.createElement("IMG");
    img.setAttribute("src", URL.createObjectURL(files[0]));

    var div = document.createElement("DIV");
    div.setAttribute("class", "thumb");
    div.appendChild(img);
    
    document.getElementById("image-upload").innerHTML = '';
    document.getElementById("image-upload").appendChild(div);
    console.log("files");

    var file_data = $("#avatar").prop("files")[0];   // Getting the properties of file from file field
    var form_data = new FormData();                  // Creating object of FormData class
    form_data.append("file", file_data)              // Appending parameter named file with properties of file_field to form_data
    form_data.append("id", user_id)                 // Adding extra parameters to form_data
    console.log(user_id);
    $.ajax({
                url: "/upload_image",
                dataType: 'script',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         // Setting the data attribute of ajax with file_data
                type: 'post'
       })

    console.log("ajaxP");

  });
});

function ajaxP(url, method, form_data){
    $.ajax({
        url : url, // gửi ajax đến file result.php
        type : method, // chọn phương thức gửi là get
        dateType: 'script', // dữ liệu trả về dạng text
        data: form_data,
        success : function (result){
            // Sau khi gửi và kết quả trả về thành công thì gán nội dung trả về
            // đó vào thẻ div có id = result
        }
    });
}