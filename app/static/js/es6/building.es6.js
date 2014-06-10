(function(){
	'use strict';
	$(document).ready(init);

	function init(){
		$('table').on('mousemove', 'td', select);
	}

	function select(){
		var floor = $('#flooring').attr('data-img');
		var Andrew = $(this);
		//$(this).css('background-color', 'black');
		$(this).css('background-image', `url(${floor})`);
		console.log(Andrew);
		console.log(floor);
	}





})();