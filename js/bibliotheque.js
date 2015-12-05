var myApp = angular.module("myApp", []) ;

myApp.controller("myController", ["$scope", "$http", function ($scope, $http){
	$scope.bookTitle = '';
	$scope.authorFirstname = '';
	$scope.authorName = '';

	$http.get('data/db.json').success(function(data) {
		$scope.bookList = data.bookList;
	});

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
		} else {
			$scope.add = false;
			$scope.edit = true;
			$scope.id = $scope.bookList[id-1].bookId;
			$scope.title = $scope.bookList[id-1].bookTitle;
			$scope.firstname = $scope.bookList[id-1].authorFirstname;
			$scope.name = $scope.bookList[id-1].authorName; 
			$scope.retDate = $scope.bookList[id-1].returnDate; 
		}
	};

	$scope.addBook = function(index) {		
		$scope.bookList.push({'bookId': $scope.bookList.length+1,'authorFirstname': $scope.firstname,'authorName': $scope.name, 'bookTitle': $scope.title, 'empDate': '', 'returnDate': $scope.retDate});
	};

	$scope.removeBook = function(idBook) {		
		$scope.bookList.splice(idBook-1, 1);
	};

	$scope.updateBook = function() {	
		$scope.bookList[$scope.id-1].bookTitle = $scope.title;
		$scope.bookList[$scope.id-1].authorFirstname = $scope.firstname;
		$scope.bookList[$scope.id-1].authorName = $scope.name;
		$scope.bookList[$scope.id-1].returnDate = $scope.retDate;
	};
}]);