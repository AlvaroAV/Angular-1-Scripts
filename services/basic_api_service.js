// This should be in a file like: ~/app/services/apiservice.js
angular.module('myApp')
  .service('apiService', function ($resource) {

    var base_url = "http://example.com:8000"

    return {
    
      // apiService method 'user' with 4 inner method to list/get/new/update/delete users
      'user': $resource(base_url+'/user/:user_id/', {}, {
        // List, new and delete will use different URLs
        list: { method: 'GET', isArray: true, cache: true, url: base_url + '/user/'},
        new: { method: 'POST', isArray: false, cache: true, url: base_url + '/user/new/'},  // Create a new user with info
        delete: { method: 'DELETE', isArray: false, cache: true, url: base_url+'/user/:user_id/delete/'},  // Delete user
        
        // Get and update methods will share the same url 
        get: { method: 'GET', isArray: false, cache: true, },  // Return a dict with user detail info
        update: { method: 'PUT', isArray: false, cache: true, },  // Update existing user
      }),
      
      // Different service method
      'other': $resource(base_url + '/other/url/', {}, {
        post: { method: 'POST', isArray: false, cache: true}
      })
    };
  });


// You should probably add the link to the service on your index.html like:
// <script src="services/apiservice.js"></script>
  
// Example: How to use of the apiService on a controller
angular.module('myApp')
  // We need to load our service 'apiService' on our controller
  .controller('myController', function ($scope, apiService) {
      $scope.users = [];
      
      // Call api service to retrieve the user list
      apiservice.user.list().$promise.then(function(result){
          console.log(result); // Should print an array of users
          $scope.users = result;      
      });
      
      // Call api service to delete user
      var delete_user_id = 32;  
      apiservice.user.delete({user_id: delete_user_id}).$promise.then(function(result){
          console.log("USER DELETED");
          console.log(result);
      });
  
      // Call api service different method
      apiservice.other.post().$promise.then(function(result){
          console.log("Accessed '/other/url/' !");
      });  
  
    });
    
