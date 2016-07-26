/**
 * HotelListItem.js *
 *
 * @author  Yichuan Lin Lee, https://github.com/ylinlee/
 *
 */

 /*---- MODEL ----*/
 function HotelListItemModel(name) {
 	this.name = name || '';
 }

/*----- VIEW ----*/
function HoteListItemView(parentNode) {

	this.dom = _createDOM();
	parentNode = typeof parentNode === 'string' ? document.getElementById(parentNode) : parentNode;
	parentNode.appendChild(this.dom);
	_addClickEventListener.call(this, arguments);

	function _createDOM(){
		/**
		 * <a class="rumbo-font" href="#">Hotel Sunny Palms</a>
		 */
		var dom = document.createElement('a');
		dom.className = 'rumbo-font';
		return dom;
	}

	function _addClickEventListener() {
		this.dom.addEventListener('click', function(event){
			var myEvent = document.createEvent('Event');
			myEvent.initEvent('item_click', true, true);
			myEvent.data = event.target.innerText;
			document.dispatchEvent(myEvent);
		});
	}
}

HoteListItemView.prototype.updateHoteListItem = _updateHoteListItemView;

/*---- CONTROLLER ----*/
function HotelListItemCtrl(parentNode, name) {
	this.model = new HotelListItemModel(name);
	this.view = new HoteListItemView(parentNode);
	this.view.updateHoteListItem(name);
}

function _updateHoteListItemView(name) {
	this.dom.innerText = name;
}
