/**
 * 
 */
$( document ).ready(function() {
	$('.search-htm').hide();
	$('.appointmentHistory-htm').hide();
});

var servicesFetchedFromDb;


function showHome(){
	
	$('.home-htm').show();
	$('.search-htm').hide();
	$('.appointmentHistory-htm').hide();
}

function showSearch(){
	
	$('.home-htm').hide();
	$('.search-htm').show();
	$('.appointmentHistory-htm').hide();
	fetchServices();	
}

function showAppointments(){
	
	$('.home-htm').hide();
	$('.search-htm').hide();
	$('.appointmentHistory-htm').show();
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
		$('#servicesDropdown').append('<option style="color: black;" value="'+servicesFetchedFromDb[i].id+'">'+servicesFetchedFromDb[i].name+'</option>');
	}
}


function searchSP(){
	
	$('#dataDiv').hide();
	$('#noResultError').hide();
	var id = $('#generatedId').val();
	id = 'ccae6267-fc33-435b-a817-1e53f117ee28';
	$.ajax({
		contentType: 'application/JSON',
		type: "GET",
		url: 'http://localhost:8083/tapserve/findServiceProviders/'+id+'/'+$('#regionIdentifier').val()+'/'+$('#servicesDropdown').val(),
		success: function(result){
			var arrayLength = result.length
			if(arrayLength == 0){
				$('#dataDiv').show();
				$('#noResultError').show();
			}else{
				$('#dataDiv').show();	
				for(var i = 0; i < arrayLength; i++){
					result[i].serviceProvider.name
					result[i].serviceProvider.organizationName
					result[i].serviceProvider.contactNumber
					result[i].serviceProvider.address
					result[i].serviceProvider.regionIdentifier
					var sum = 0;
					var reviewsLength = result[i].reviews.length
					for(var j = 0; j < reviewsLength; j++){
						sum = sum + result[i].reviews[j].rating;
					}
					var avgRating = sum/reviewsLength;
					$('#dataDiv').append('<div class="panel panel-default"> <div class="panel-heading"><span>'+result[i].serviceProvider.name+'</span></div> <div class="panel-body">'+'<span>'+result[i].serviceProvider.organizationName+'</span>'+'<span>'+avgRating+' stars</span>'+'</div></div>');
				}
			}
		}
	});
}