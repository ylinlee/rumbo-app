/**
 * HotelMain.js *
 *
 * @author  Yichuan Lin Lee, https://github.com/ylinlee/
 *
 */

 var DataService = (function() {

	var instance;

	function init() {
	    var _getHotels = function() {

	    	function _requestFile(resolve, reject) {
	    		var xmlhttp = new XMLHttpRequest();
		        var url = './data/hotels.json';

		        xmlhttp.onload = function() {
		            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		            	resolve(JSON.parse(xmlhttp.responseText));
		            } else {
		            	reject({
		            		status: this.status,
		            		statusText: xmlhttp.statusText
		            	});
		            }
		        };
		        xmlhttp.onerror = function() {
		        	reject({
				        status: this.status,
				        statusText: xmlhttp.statusText
				    });
		        }
		        xmlhttp.open('GET', url, true);
		        xmlhttp.send();
	    	}

	    	return new Promise(function (resolve, reject) {
	    		_requestFile(resolve, reject);
	    	});
	    };

	    return {
	        getHotels: _getHotels
	    }
	}

	return {
	    getInstance: function () {
	      if ( !instance ) {
	        instance = init();
	      }
	      return instance;
	    }
	};
})();

function HotelMainCtrl(idHotelDetail, idHotelList) {
	DataService.getInstance().getHotels().then(function(response){
		var hotels = response.hotels;
		_initHotelList(idHotelList, hotels);
		_initHotelDetail(idHotelDetail, hotels[0]);
	});
}

function _initHotelList(idHotelList, hotels) {
	var item;
	for(var i in hotels){
		item = new HotelListItemCtrl(idHotelList, hotels[i].name);
	}
}

function _initHotelDetail(idHotelDetail, hotel) {
	var controller = new HotelDetailCtrl(idHotelDetail ,hotel);
    document.addEventListener('item_click', function (e) {
      var hotelName = e.data;
      DataService.getInstance().getHotels().then(function(response){
      	var hotels = response.hotels;
      	var hotel = _getHotelByName(hotels, hotelName);
      	controller.handlerChangeHotel(hotel);
      });
    }, false);
}

function _getHotelByName(hotels, name) {
	var hotel = {};
    for(var i in hotels){
        if(hotels[i].name === name) {
            return hotels[i];
        }
    }
    return hotel;
}