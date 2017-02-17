/**
 * 
 */
var servicesSelected = [];
function SPRegister(){
	
	fillServices();
	$('#').val();

	var obj = new Object();
	obj.id = $('#generatedId').val();
	obj.name = $('#fullname').val();
	obj.organizationName = $('#organizationName').val();
	obj.contactNumber = $('#contactNumber').val();
	obj.address = $('#address').val();
	obj.regionIdentifier = $('#regionIdentifier').val();
	obj.services = servicesSelected;
	
	var jsonString = JSON.stringify(obj);
	
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/register/service_provider/'+$('#generatedId').val(),
		data: jsonString,
		success: function(result){
			$('#generatedId').val("");
			$('#successMessage').text("You have been registered successfully! Please wait while you are being redirected to the login page.").show();
			$('#pageContent').delay(20000).load( "pages/login.html" );
			$(document).attr("title", "TapServe");
		}
	});
}

function fillServices(){
	if(document.getElementById('electricianServiceOpt').checked)
		servicesSelected.push(electricianService);
	
	if(document.getElementById('carpenterServiceOpt').checked)
		servicesSelected.push(carpenterService);
	
	if(document.getElementById('plumberServiceOpt').checked)
		servicesSelected.push(plumberService);
	
	if(document.getElementById('eventPlannerServiceOpt').checked)
		servicesSelected.push(eventPlannerService);
	
	if(document.getElementById('photographerServiceOpt').checked)
		servicesSelected.push(photographerService);
	
	if(document.getElementById('yogaInstructorServiceOpt').checked)
		servicesSelected.push(yogaInstructorService);
}