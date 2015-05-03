//Creates knockout view model
function businessViewModel() {
  	var self = this;
    //debugger;
    //self.thewindows = {
    //    title: m[i][0],
    //    ph: m[i][1],
    //    pic: m[i][4],
    //    blurb: m[i][5]
    //};

    //Sets the bind-data in the search field.
	self.searchTerm = ko.observable('Sushi');

    //This will update the results/
	self.updateYelpResults = function(){

        //Returns updated data from the search field and then it will create the list based on the zip code and
        //the information in the search field/
		ko.computed(function(){
			yelpAjax('30308', self.searchTerm());
		}, self);
	};
}

//Applies binding from knockout to the buisinessViewModel function.
ko.applyBindings(new businessViewModel());