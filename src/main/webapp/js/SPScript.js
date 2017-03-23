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
}