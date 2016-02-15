var myApp = angular.module("myApp", []) ;

myApp.controller("myController", ["$scope", "$http", function ($scope, $http){
	$scope.bookTitle = '';
	$scope.authorFirstname = '';
	$scope.authorName = '';
	$scope.bookCote = '';

	$scope.reload = function() {
		$http.get('data/db.json').success(function(data) {
			$scope.bookList = data.bookList;
		});
	};

	$scope.save = function() {
		var newArray = { 'bookList' : "" };
		newArray['bookList'] = JSON.parse(angular.toJson($scope.bookList));
	  	$http.post('data/saveJson.php', newArray).then(function() {
	  	});
	};

	$scope.reload();
	$scope.dateNow = new Date();

	$scope.edit = false;
	$scope.add = false;
	$scope.error = false; 
	$scope.hideform = true; 

	$scope.editBook = function(id) {
		if ($scope.hideform)
			$scope.hideform = false;
		else 
			$scope.hideform = true;

		if (id == 'new') {
			$scope.edit = false;
			$scope.add = true;
			$scope.title = '';
			$scope.firstname = '';
			$scope.name = '';
			$scope.cote = '';
		} else {
			$scope.add = false;
			$scope.edit = true;
			$scope.id = $scope.bookList[id-1].bookId;
			$scope.title = $scope.bookList[id-1].bookTitle;
			$scope.firstname = $scope.bookList[id-1].authorFirstname;
			$scope.name = $scope.bookList[id-1].authorName; 
			$scope.empDate = $scope.bookList[id-1].empDate; 
			$scope.retDate = $scope.bookList[id-1].returnDate; 
			$scope.cote = $scope.bookList[id-1].bookCote; 
		}
	};

	$scope.addBook = function(index) {		
		$scope.bookList.push({'bookId': $scope.bookList.length+1,'authorFirstname': $scope.firstname,'authorName': $scope.name, 'bookTitle': $scope.title, 'empDate': '', 'returnDate': '', 'bookCote': $scope.cote});
		$scope.save();
	};

	$scope.removeBook = function(idBook) {		
		$scope.bookList.splice(idBook-1, 1);
		$scope.save();
	};

	$scope.updateBook = function() {	
		$scope.bookList[$scope.id-1].bookTitle = $scope.title;
		$scope.bookList[$scope.id-1].authorFirstname = $scope.firstname;
		$scope.bookList[$scope.id-1].authorName = $scope.name;
		$scope.bookList[$scope.id-1].bookCote = $scope.cote;
		$scope.save();
	};

	$scope.change = function() {
		var book = JSON.parse($scope.selectedBook);
		$("#hiddenId").val(book.bookId);
		$("#reservNom").val(book.authorName);
		$("#reservPre").val(book.authorFirstname);
		$("#reservCote").val(book.bookTitle);
    };

    $scope.reservBook = function() {
    	var id = $("#hiddenId").val();

		$scope.bookList[id-1].empDate = convertDate($scope.dateNow); 
		$scope.dateNow.setDate($scope.dateNow.getDate() + 15);
		var newDate = new Date($scope.dateNow);

		$scope.bookList[id-1].returnDate =convertDate(newDate);
		$scope.save();
	};

	function convertDate(date) {
		var dd = date.getDate();
		if (dd.toString().length == 1) 
	    	dd = '0' + dd;

		var mm = date.getMonth()+1;
	    if (mm.toString().length == 1) 
	    	mm = '0' + mm;

	    var yyyy = date.getFullYear();
	    var today = dd + '/' + mm + '/' + yyyy;
		return today;
	}
}]);

myApp.filter("availableBook", function(){
	return function(enter)  {
	 		if (enter == undefined)
	 			return
	  	var list = [];
	  	for (var i=0;i<enter.length;i++)
			if (enter[i].empDate == '') 
				list.push(enter[i]);								
	  	return list;
	}
});
