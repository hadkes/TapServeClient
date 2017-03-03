/**
 * 
 */
$( document ).ready(function() {
	$('.search-htm').hide();
	$('.appointmentHistory-htm').hide();
});

function showHome(){
	
	$('.home-htm').show();
	$('.search-htm').hide();
	$('.appointmentHistory-htm').hide();
}

function showSearch(){
	
	$('.home-htm').hide();
	$('.search-htm').show();
	$('.appointmentHistory-htm').hide();
}

function showAppointments(){
	
	$('.home-htm').hide();
	$('.search-htm').hide();
	$('.appointmentHistory-htm').show();
}