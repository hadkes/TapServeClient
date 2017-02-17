/**
 * 
 */

function adminRegister(){
	var obj = new Object();
	obj.id = $('#generatedId').val();
	obj.name = $('#name').val();
	obj.description = $('#description').val();
	
	var jsonString = JSON.stringify(obj);
	
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/register/administrator/'+$('#generatedId').val(),
		data: jsonString,
		success: function(result){
			$('#generatedId').val("");
			$('#successMessage').text("You have been registered successfully! Please wait while you are being redirected to the login page.").show();
			$('#pageContent').delay(20000).load( "pages/login.html" );
			$(document).attr("title", "TapServe");
		}
	});
}