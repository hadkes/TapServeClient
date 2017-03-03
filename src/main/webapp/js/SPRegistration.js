/**
 * 
 */
$( document ).ready(function() {
		fetchServices();
	});


var servicesSelected = [];
var servicesFetchedFromDb;
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

function fetchServices(){
	$.ajax({
		contentType: 'application/JSON',
		type: "GET",
		url:'http://localhost:8083/tapserve/services',
		success: function(result){
			servicesFetchedFromDb = result;
			populateServicesOnPage();
		}
	});
}

function populateServicesOnPage(){
	var arrayLength= servicesFetchedFromDb.length;
	for (var i = 0; i < arrayLength; i++) {
		$( "#servicesChecklist" ).append('<input type="checkbox" id="ServiceOpt'+i+'">');
		$( "#servicesChecklist" ).append(servicesFetchedFromDb[i].name + '<br>');
	}
}

function fillServices(){
	var arrayLength= servicesFetchedFromDb.length;
	for(var i = 0; i < arrayLength; i++){
		if(document.getElementById('ServiceOpt'+i).checked)
			servicesSelected.push(servicesFetchedFromDb[i]);
	}
}