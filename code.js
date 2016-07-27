$(document).ready(function(){
  $('a').click(function(event){
    console.log($(this).attr('href'));
    return false;
  })
})
