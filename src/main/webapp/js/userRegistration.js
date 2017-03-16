/**
 * 
 */

function userRegister(){
	var obj = new Object();
	obj.id = $('#generatedId').val();
	obj.name = $('#fullname').val();
	obj.address = $('#address').val();
	obj.contactNumber = $('#contactNumber').val();
	obj.fbId = $('#facebookId').val();
	
	var jsonString = JSON.stringify(obj);
	
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/register/user/'+$('#generatedId').val(),
		data: jsonString,
		success: function(result){
			$('#successMessage').text("You have been registered successfully! Please wait while you are being redirected to the login page.").show();
			$('#pageContent').delay(20000).load( "pages/login.html" );
			$(document).attr("title", "TapServe");
		}
	});
	
}