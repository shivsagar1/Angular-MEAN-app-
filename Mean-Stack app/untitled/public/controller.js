var my_app = angular
    .module("my_app" , [])
    .controller("my_controller", function ($scope, $http) {
        $scope.show_add_form= function () {

            document.getElementById('table_form_add').style.display = '';

        };
        


        var refresh = function () {


            $http.get('/contactlist').success(function (response) {

                console.log("I got the data I requested");
                $scope.contactlist = response;
                $scope.contact = '';
            });

        };
        refresh();

        //post the data from the front end to mongo db

        $scope.addContact = function () {
            //this is just to check whether we are getting the data
            console.log($scope.contact);

            // now we need to send the data to the server
            $http.post('/contactlist' , $scope.contact).success(function (response) {
                console.log(response);

                refresh();

            });
        };
        $scope.remove = function (id) {

          console.log(id);
            //IMPORTANT step.. we want to delete the
            //data based on the id of the data
            //therefore, when we are sending the data
            //back to the server and then the database
            // we just send the id and then it identifies
            //the data based on the id and deletes it
           $http.delete('/contactlist/'+id).success(function (response) {
               refresh();

           });


        };

        $scope.edit = function (id) {

            console.log(id);
            $http.get('/contactlist/'+id).success(function (response) {
                $scope.contact = response;




            });

        };

        $scope.updateContact = function (response) {
            console.log($scope.contact._id);
            //http put will send all the data to the server
            //the two parameters are are the id that is the first parameter
            //and the second parameter will send the entire contaact(which
            //contains name email and number) back to the server.
            $http.put('/contactlist/'+$scope.contact._id , $scope.contact).success(function (response) {
                refresh();

            });


        };

        $scope.deselect = function () {
            $scope.contact = "";

        }


});

