$( document ).ready(function() {
	$('.search-htm').hide();
});


function showHome(){
	
	$('.home-htm').show();
	$('.search-htm').hide();
}

function showSearch(){
	
	$('.home-htm').hide();
	$('.search-htm').show();
	$('#dataDiv').hide();
	showOpenAppointment();
}

function showOpenAppointment(){
	
	$('#dataDiv').hide();
	var id = $('#generatedId').val();
	$.ajax({
		contentType: 'application/JSON',
		type: "GET",
		url: 'http://localhost/tapserve/'+id+'/appointments/open',
		success: function(result){
			$('#dataDiv').empty();
			var arrayLength = result.length
			if(arrayLength == 0){
				$('#dataDiv').show();
				$('#noResultError').show();
			}else{
				$('#dataDiv').show();	
				for(var i = 0; i < arrayLength; i++){					
					$('#dataDiv').append('<div id="appointmentPane'+i+'" class="w3-panel w3-card-8 w3-theme-d1"> <p> Appointment Name : '+result[i].name+'&nbsp;&nbsp; Booking Date : '+(new Date(result[i].bookingDate)).toLocaleString()+' &nbsp; Appointment Date : '+(new Date(result[i].appointmentDate)).toLocaleString()+' </p><p>Description : '+result[i].description+' &nbsp; Address : '+result[i].address+' &nbsp; Contact No. : '+result[i].contactNumber+'</p></div>');
				}
			}
		}
	});
}