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
		url: 'http://localhost/tapserve/register',
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
		url: 'http://localhost/tapserve/login',
		data: jsonString,
		success: function(result){
			var usertype = result.role.name;
			$('#generatedId').val(result.id);
			if(usertype == "USER"){
				$(document).attr("title", "TapServe - User");
				$('#pageContent').load( "pages/secured/UserLanding.html");
				$('#userDetailName').text(result.name).show();			
				$('#userDetailAddress').text(result.address).show();
				$('#userDetailContactNo').text(result.contactNumber).show();
			}
			else if(usertype == "SERVICE_PROVIDER"){
				$(document).attr("title", "TapServe - Service Provider");
				$('#pageContent').load( "pages/secured/SPLanding.html");
			}
			else if(usertype == "ADMIN"){
				$(document).attr("title", "TapServe - Admin");
			}
		}
	});
}

function setVal(element){
	usertype = $(element).val();
}