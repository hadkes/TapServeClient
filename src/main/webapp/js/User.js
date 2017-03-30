/**
 * 
 */
$( document ).ready(function() {
	$('.search-htm').hide();
	$('.appointmentHistory-htm').hide();
});

var servicesFetchedFromDb;
var searchResult;
var selectedSP;
var appointmentList;


function showHome(){
	
	$('.home-htm').show();
	$('.search-htm').hide();
	$('.appointmentHistory-htm').hide();
}

function showSearch(){
	
	$('.home-htm').hide();
	$('.search-htm').show();
	$('.appointmentHistory-htm').hide();
	$('#dataDiv').hide();
	fetchServices();
}

function showAppointments(){
	
	$('.home-htm').hide();
	$('.search-htm').hide();
	$('.appointmentHistory-htm').show();
	showAppointmentListForUser();
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
	$.ajax({
		contentType: 'application/JSON',
		type: "GET",
		url: 'http://localhost:8083/tapserve/findServiceProviders/'+id+'/'+$('#regionIdentifier').val()+'/'+$('#servicesDropdown').val(),
		success: function(result){
			$('#dataDiv').empty();
			searchResult = result;
			var arrayLength = result.length
			if(arrayLength == 0){
				$('#dataDiv').show();
				$('#noResultError').show();
			}else{
				$('#dataDiv').show();	
				for(var i = 0; i < arrayLength; i++){
					var sum = 0;
					var reviewsLength = result[i].reviews.length
					for(var j = 0; j < reviewsLength; j++){
						sum = sum + result[i].reviews[j].rating;
					}
					var avgRating = sum/reviewsLength;
					$('#dataDiv').append('<div id="detailsPane'+i+'" class="w3-panel w3-card-8 w3-theme-d1"> <p> Provider Name : '+result[i].serviceProvider.name+'</p> <p> Organisation Name : '+result[i].serviceProvider.organizationName+' &nbsp; Average Rating : '+avgRating+' stars</p>'+'<p>Contact No. : '+result[i].serviceProvider.contactNumber+' &nbsp;&nbsp;&nbsp; Address : '+result[i].serviceProvider.address+' &nbsp;&nbsp; Region : '+result[i].serviceProvider.regionIdentifier+'</p> <div class="group"><input type="button" class="button" value="Book Appointment" onclick="bookAppointment('+i+');"></div></div>');
				}
			}
		}
	});
}

function bookAppointment(count){

	selectedSP = count;
	$('#searchFields').hide();
	$('#SPname').val(searchResult[count].serviceProvider.name);
	$('#orgName').val(searchResult[count].serviceProvider.organizationName);
	$('#contactNo').val(searchResult[count].serviceProvider.contactNumber);
	$('#address').val(searchResult[count].serviceProvider.address);
	$('#region').val(searchResult[count].serviceProvider.regionIdentifier);
	$('#appointmentFields').show();
	
}

function backToSearch(){
	$('#appointmentFields').hide();
	$('#appointmentResultSpace').hide();
	$('#searchFields').show();
}

function appointmentRequest(){
	
	var appointment = new Object();
	appointment.name = $('#appointmentName').val();
	appointment.description = $('#appointmentDescription').val();
	appointment.address = $('#appointmentAddress').val();
	appointment.appointmentDate = $('#appointmentDateTime').val();
	appointment.contactNumber = $('#appointmentContactNo').val();
	
	
	var user = new Object();
	user.id = $('#generatedId').val();
	
	var serviceProvider = new Object();
	serviceProvider.id = searchResult[selectedSP].serviceProvider.id
	
	var service = new Object();
	service.id = $('#servicesDropdown').val();
	
	
	appointment.user = user;
	appointment.serviceProvider = serviceProvider;
	appointment.service = service;
	
	
	var jsonString = JSON.stringify(appointment);
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/'+user.id+'/bookAppointment/'+serviceProvider.id+'/'+service.id,
		data: jsonString,
		success: function(result){
			$('#appointmentFields').hide();
			if(result.id != ""){
				$('#successMessage').text("Your appointment has been booked successfully!").show();
			}else{
				$('#failureMessage').text("Appointment booking failed!").show();
			}
			$('#appointmentResultSpace').show();
		}
	});
}

function showAppointmentListForUser(){

	$('#appointmentDetailsSpace').hide();
	var id = $('#generatedId').val();
	$.ajax({
		contentType: 'application/JSON',
		type: "GET",
		url: 'http://localhost:8083/tapserve/'+id+'/appointments',
		success: function(result){
			$('#appointmentList').empty();
			appointmentList = result;
			var arrayLength = result.length
			if(arrayLength == 0){
				$('#appointmentList').show();
				$('#noResultError').show();
			}else{
				$('#appointmentList').show();	
				for(var i = 0; i < arrayLength; i++){					
					$('#appointmentList').append('<div id="appointmentPane'+i+'" class="w3-panel w3-card-8 w3-theme-d1"> <p> Appointment Name : '+result[i].name+'&nbsp;&nbsp; Booking Date : '+(new Date(result[i].bookingDate)).toLocaleString()+' &nbsp; Appointment Date : '+(new Date(result[i].appointmentDate)).toLocaleString()+' </p>'+'<p>Service Provider Name : '+result[i].serviceProvider.name+' </p> <div class="group"><input type="button" class="button" value="Show Details" onclick="showAppointmentDetail('+i+');"></div></div>');
				}
			}
		}
	});
}

function showAppointmentDetail(count){
	
	$('#appointmentList').hide();
	$('backButton').show();
	var appointmentId = appointmentList[count].id;
	var userId = $('#generatedId').val();
	$.ajax({
		contentType: 'application/JSON',
		type: "GET",
		url: 'http://localhost:8083/tapserve/'+userId+'/appointments/'+appointmentId,
		success: function(result){
			$('#appointmentDetailsSpace').empty();
			$('#appointmentDetailsSpace').show();
			if(result.status == "0"){
				$('#appointmentDetailsSpace').append('<div id="appointmentDetailsPane" class="w3-panel w3-card-8 w3-theme-d1"> <p> Appointment Name : '+result.name+'&nbsp;&nbsp; Booking Date : '+(new Date(result.bookingDate)).toLocaleString()+' &nbsp; Appointment Date : '+(new Date(result.appointmentDate)).toLocaleString()+' </p> <p>Description : '+result.description+' &nbsp; Address : '+result.address+' &nbsp; Contact No. : '+result.contactNumber+'</p> <p>Service Provider Name : '+result.serviceProvider.name+' &nbsp;&nbsp; Service Name : '+result.service.name+'</p></div> <div id="paymentPane" class="w3-panel w3-card-8 w3-theme-d1"><div class="group"><label for="user" class="label">Amount</label> <input id="amount" type="number"></div><div class="group"><input type="button" class="button" value="Pay" onclick="makePayment('+count+');"></div></div> <div id="reviewPane" class="w3-panel w3-card-8 w3-theme-d1"><div class="group"><label for="user" class="label">Review</label> <textarea id="review" ></textarea></div><div class="group"><label for="user" class="label">Rating</label><select name="rating" class="input" id="rating"><option value="select" style="color: black;">--Select--</option><option style="color: black;" value="1">1</option><option style="color: black;" value="2">2</option><option style="color: black;" value="3">3</option><option style="color: black;" value="4">4</option><option style="color: black;" value="5">5</option></select></div><div class="group"><input type="button" class="button" value="Post Review" onclick="postReview('+count+');"></div></div>');
			}else if (result.status == "1"){
				$('#appointmentDetailsSpace').append('<div id="appointmentDetailsPane" class="w3-panel w3-card-8 w3-theme-d1"> <p> Appointment Name : '+result.name+'&nbsp;&nbsp; Booking Date : '+(new Date(result.bookingDate)).toLocaleString()+' &nbsp; Appointment Date : '+(new Date(result.appointmentDate)).toLocaleString()+' </p> <p>Description : '+result.description+' &nbsp; Address : '+result.address+' &nbsp; Contact No. : '+result.contactNumber+'</p> <p>Service Provider Name : '+result.serviceProvider.name+' &nbsp;&nbsp; Service Name : '+result.service.name+'</p></div> <div id="reviewPane" class="w3-panel w3-card-8 w3-theme-d1"><div class="group"><label for="user" class="label">Review</label> <textarea id="review" ></textarea></div><div class="group"><label for="user" class="label">Rating</label><select name="rating" class="input" id="rating"><option value="select" style="color: black;">--Select--</option><option style="color: black;" value="1">1</option><option style="color: black;" value="2">2</option><option style="color: black;" value="3">3</option><option style="color: black;" value="4">4</option><option style="color: black;" value="5">5</option></select></div><div class="group"><input type="button" class="button" value="Post Review" onclick="postReview('+count+');"></div></div>');
			}
			}
	});
}

function makePayment(count){
	var appointmentId = appointmentList[count].id;
	var userId = $('#generatedId').val();
	
	var payment = new Object();
	payment.amount = $('#amount').val();
	payment.mode = "card";
	
	var appointment = new Object();
	appointment.id = appointmentId;
	
	payment.appointment = appointment;
	
	var jsonString = JSON.stringify(payment);
	
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/'+userId+'/payment/'+appointmentId,
		data: jsonString,
		success: function(result){
			$('#paymentPane').empty();
			$('#paymentPane').hide();
		}
	});
}

function postReview(count){
	var serviceProviderId = appointmentList[count].serviceProvider.id;
	var userId = $('#generatedId').val();	
	
	var review = new Object();
	review.rating = $('#rating').val();
	review.review = $('#review').val();
	
	var user = new Object();
	user.id = userId;
	
	var serviceProvider = new Object();
	serviceProvider.id = serviceProviderId;
	
	review.user = user;
	review.serviceProvider = serviceProvider;
	
	var jsonString = JSON.stringify(review);
	$.ajax({
		contentType: 'application/JSON',
		type: "POST",
		url: 'http://localhost:8083/tapserve/'+userId+'/postReview/'+serviceProviderId,
		data: jsonString,
		success: function(result){
			$('#reviewPane').empty();
			$('#reviewPane').hide();
		}
	});
	
}