"use strict"

function shoppingCart() {
	this.total = 0;
	this.items = {};
}

shoppingCart.prototype = {
	addItem: function(item, price, quantity){
		this.total += price * quantity;
		if(item in this.items){
			this.items[item] += quantity;
		} else {
			this.items[item] = quantity;
		}
		return quantity + " "+ item + " has been added to your cart";
	},
	removeItem: function(item, price, quantity){
		if(item in this.items){
			if(quantity > this.items[item]){
				return "You can't remove " + (quantity) + ". You only have " + (this.items[item]) + " in your cart";
			} else {
				this.items[item] -= quantity;
				return "Removed "+ quantity;
			}
		} else {
			return "This item is not in your cart";
		}
	},
	checkOut: function(){
		return {
			itemDetails: this.items,
			totalCost: this.total
		};
	},
	pay:  function(walletBalance){
		if(this.total > 0){		
			if(walletBalance < this.total){
				return "You do not have enough cash in your wallet";
			} else {
				return "Your Balance is: " + (walletBalance - this.total);
			}
		} else {
			return "Your Cart is empty";
		}
	}
};

// Inherit the shoppingCart Object
function Shop(){
	shoppingCart.call(this);
}

Shop.prototype = Object.create(shoppingCart.prototype);
Shop.prototype.constructor = Shop;

Shop.prototype.newShop = function(shopName, shopAddress, openingTime, closingTime) {
	this.openingTime = openingTime;
	this.closingTime = closingTime;
	return "You created a new shop named '" + shopName + "' located at '" + shopAddress + "'";
};
Shop.prototype.workingHours = function(){
	var currentDate = new Date();
	if(currentDate.getHours() >= this.openingTime){
		return "We are currently Open";
	} else if(currentDate.getHours() >= this.closingTime) {
		return "Sorry, We are closed";
	} else {
		return "Sorry, We are closed";
	}
}