// This should be in a file like: ~/app/services/myservice.js

angular.module('myApp')
  .service('myService', function () {
      
      this.helloWorld = function(){
          console.log("Hello World");
      }
      
      this.pow = function(base, exponent){
          return Math.pow(base, exponent);
      }
  });

// You should probably add the link to the service on your index.html like:

<script src="services/myservice.js"></script>
  
  
// Example: How to use of the service on a controller

angular.module('myApp')
  // We need to load our service 'myService' on our controller
  .controller('myController', function ($scope, myService) {
  
  // Now we can access to the service functions:
  myService.helloWorld();  // This will print the message
  
  var result = myService.pow(2, 3);  // Result will contain '8'
  
}
