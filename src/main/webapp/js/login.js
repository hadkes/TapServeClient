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
			if(usertype == "user"){
				$(document).attr("title", "User Registration");
				$('#pageContent').load( "pages/UserRegistrationPage.html");
				$('#generatedId').val(result);
			}
			else if(usertype == "service_provider"){
				$(document).attr("title", "Service Provider Registration");
				$('#pageContent').load( "pages/SPRegistrationPage.html" );
				$('#generatedId').val(result);
			}
			else if(usertype == "administrator"){
				$(document).attr("title", "Admin Registration");
				$('#pageContent').load( "pages/AdminRegistrationPage.html" );
				$('#generatedId').val(result);
			}
		}
	});
}

function login(){
	var username = $('#loginusername').val();
	var password = $('#loginpassword').val();

	var obj = new Object();
	obj.username = username;
	obj.password = password;
	var jsonString = JSON.stringify(obj);
	
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/login',
		data: jsonString,
		success: function(result){
			var usertype = result.role.name;
			alert("On return usertype "+usertype);
			if(usertype == "USER"){
				$(document).attr("title", "TapServe - USER");
				$('#pageContent').load( "pages/secured/UserLanding.html");
			}
			else if(usertype == "SERVICE_PROVIDER"){
				$(document).attr("title", "TapServe - SERVICE_PROVIDER");
			}
			else if(usertype == "ADMIN"){
				$(document).attr("title", "TapServe - ADMIN");
			}
		}
	});
}

function setVal(element){
	usertype = $(element).val();
}