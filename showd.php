<script type= "text/javascript" src="js/jquery-1.11.1.min.js"> </script>
    <script type= "text/javascript">
$(document).ready(function() {
function update() {
  
$.ajax({
   type: 'POST',
  url: 'datetime.php',
  timeout: 1000,
  success: function(data) {
      $("#timer").html(data); 
    window.setTimeout(update, 1000);
   },
  });
 }
update();
});

</script>

<div id="timer"> </div>
