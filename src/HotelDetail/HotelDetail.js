/**
 * HotelDetail.js *
 *
 * @author  Yichuan Lin Lee, https://github.com/ylinlee/
 *
 */

/*---- MODEL ----*/
function HotelDetailModel(hotelDetail) {
	this.name = hotelDetail.name || 'Default Hotel';
	this.imgUrl = hotelDetail.imgUrl || '';
	this.rating = hotelDetail.rating || 0;
	this.price = hotelDetail.price || 0.00;
}

HotelDetailModel.prototype.updateHotelDetail = _updateHotelDetailModel;

/*----- VIEW ----*/
var POUND = '£';

function HotelDetailView(parentNode) {

	parentNode = typeof parentNode === 'string' ? document.getElementById(parentNode) : parentNode;
	this.imgUrlDOM = _createImgUrlDOM();
	this.nameDOM = _createNameDOM();
	this.ratingDOM = _createRatingDOM();
	this.priceDOM = _createPriceDOM();
	this.dom = _createDOM.apply(this,arguments);
	parentNode.appendChild(this.dom);

	function _createImgUrlDOM() {
		return document.createElement('img');
	}

	function _createNameDOM() {
		return document.createElement('h1');
	}

	function _createRatingDOM() {
		var dom = document.createElement('i');
		dom.className = 'hotel-rating hotel-rating-0';
		return dom;
	}

	function _createPriceDOM() {
		var dom = document.createElement('span');
		dom.className = 'hotel-price';
		dom.innerText = POUND;
		return dom;
	}

	function _createDOM() {
		/**
		 *  <article>
         *    <div class="hotel-image">
         *      <img src= "imgUrl" />
         *    </div>
         *    <div class="hotel-info">
         *      <header>
         *          <h1> name </h1>
         *          <i class="hotel-rating hotel-rating-rating"></i>
         *      </header>
         *      <footer>
         *          <span class="hotel-price">&#163; price </span>
         *          <span>Total hotel stay</span>
         *      </footer>
         *    </div>
         *  </article>
         */
		var dom = document.createElement('article');

		var hotelImageDOM = document.createElement('div');
		hotelImageDOM.className = 'hotel-image';
		hotelImageDOM.appendChild(this.imgUrlDOM);
		dom.appendChild(hotelImageDOM);

		var hotelInfoDOM = document.createElement('div');
		hotelInfoDOM.className = 'hotel-info';

		var header = document.createElement('header');
		header.appendChild(this.nameDOM);
		header.appendChild(this.ratingDOM)

		var footer = document.createElement('footer');
		footer.appendChild(this.priceDOM);
		var text = document.createElement('span');
		text.innerText = 'Total hotel stay';
		footer.appendChild(text);

		hotelInfoDOM.appendChild(header);
		hotelInfoDOM.appendChild(footer);

		dom.appendChild(hotelImageDOM);
		dom.appendChild(hotelInfoDOM);

		return dom;
	}

}

HotelDetailView.prototype.updateHotelDetail = _updateHotelDetailView;

/*---- CONTROLLER ----*/
function HotelDetailCtrl(parentNode, hotelDetail) {
	this.model = new HotelDetailModel(hotelDetail);
	this.view = new HotelDetailView(parentNode);
	this.view.updateHotelDetail(this.model);
}

HotelDetailCtrl.prototype.handlerChangeHotel = _handlerChangeHotel;


/*---- PRIVATE FUNCTIONS ----*/
function _updateHotelDetailModel(hotelDetail) {
	this.name = hotelDetail.name;
	this.imgUrl = hotelDetail.imgUrl;
	this.rating = hotelDetail.rating;
	this.price = hotelDetail.price;
}

function _updateHotelDetailView(hotelDetail){
	this.nameDOM.innerText = hotelDetail.name;
	this.imgUrlDOM.src = hotelDetail.imgUrl;
	this.ratingDOM.className = 'hotel-rating hotel-rating-' + hotelDetail.rating;
	this.priceDOM.innerText = POUND + hotelDetail.price.toFixed(2);
}

function _handlerChangeHotel(hotelDetail) {
	this.model.updateHotelDetail(hotelDetail);
	this.view.updateHotelDetail(hotelDetail);
}