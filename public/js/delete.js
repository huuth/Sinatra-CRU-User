$(function(){
  
  $('button').on('click', function(event){
      $.ajax({
            url : '/delete', // gửi ajax đến file result.php
            type : 'get', // chọn phương thức gửi là get
            data : { // Danh sách các thuộc tính sẽ gửi đi
                 id: $(this).val()
            }
            // success : function (result){
            //     document.getElementById($(this).val()+"").innerHTML = '';
            // }
        })
      document.getElementById($(this).val()+"").innerHTML = '';
      // console.log("ok");
    });
});
