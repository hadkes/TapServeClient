var usertype;
function signUp(){
	var password = $('#password').val();
	var repeatPassword = $('#repeat_password').val();
	var obj = new Object();
	obj.username = $('#username').val();
	obj.password = $('#password').val();
	var jsonString = JSON.stringify(obj);
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/register',
		data: jsonString,
		success: function(result){
			alert(result);
			if(usertype == "user"){
				$('#pageContent').load( "pages/UserRegistrationPage.html" );
			}
			else if(usertype == "service_provider"){
				$('#pageContent').load( "pages/SPRegistrationPage.html" );
			}
			else if(usertype == "administrator"){
				$('#pageContent').load( "pages/AdminRegistrationPage.html" );
			}
		}
	});
}
	
function setVal(element){
	usertype = $(element).val();
}