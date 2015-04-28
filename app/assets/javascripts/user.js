  $('document').ready(function(){
    checkLoggedIn();
  });

    var myApp = angular.module("myApp", ["firebase", 'ui.bootstrap']);

    myApp.controller("MyController", ["$scope", "$firebaseArray",
      function($scope, $firebaseArray) {
        //CREATE A FIREBASE REFERENCE
        var ref = new Firebase("https://asurveyclone.firebaseio.com/users");

        // GET MESSAGES AS AN ARRAY
        $scope.messages = $firebaseArray(ref);

        //ADD MESSAGE METHOD
        $scope.createUser = function(e) {

          //Make sure there's a password
          if ($scope.name && $scope.email && $scope.password) {
            //ALLOW CUSTOM OR ANONYMOUS USER NAMES
            var name = $scope.name || "anonymous";
            var email = $scope.email || "anonymous";
            var password = $scope.password || "BROKEN THINGS!";


            //ADD TO FIREBASE
            $scope.messages.$add({
              username: name,
              email: email,
              password: password
            });

            //RESET MESSAGE
            $scope.name = "";
            $scope.email = "";
            $scope.password = "";

            sign_in($scope.username, $scope.password);
          }
        }
      }
    ]);

    var myApp = angular.module("profile", ["firebase", 'ui.bootstrap']);

    myApp.controller("MyController", ["$scope", "$firebaseArray",
      function($scope, $firebaseArray) {
        //CREATE A FIREBASE REFERENCE
        var profile_ref = new Firebase("https://asurveyclone.firebaseio.com/users");

        var survey_ref = new Firebase("https://asurveyclone.firebaseio.com/surveys");

        var response_ref = new Firebase("https://asurveyclone.firebaseio.com/responses");

        // GET MESSAGES AS AN ARRAY
        $scope.profiles = $firebaseArray(profile_ref);
        $scope.surveys = $firebaseArray(survey_ref);
        $scope.responses = $firebaseArray(response_ref);
        $scope.current_survey = {};
        $scope.myCombo = "ZgrlZ";

        $scope.update = function(){
          $scope.myCombo = $scope.surveys_combo.val();
        }

        var profile = this;

        profile.surveys = [];
        profile.responses = [];


        var j = 0;
        var k = 0;
        profile_ref.orderByChild("username").equalTo(getCookie("username")).limitToLast(1).on("child_added", function(snapshot) {
          profile.profile_info = snapshot.val();
          profile.getSurveys();
        });

        profile.getSurveys = function(){
        survey_ref.orderByChild("author").equalTo(getCookie("username")).on("child_added", function(snapshot) {
            profile.surveys[k] = snapshot.val();
            profile.getResponses(snapshot.val().id);
            k++;
          }); 
        }

        profile.getResponses = function(id){
          response_ref.orderByChild("survey_id").equalTo(id).on("child_added", function(snapshot) {
            profile.responses[j] = snapshot.val();
            j++;
          }); 

          $('#surveys_combo').kendoComboBox({ 
            dataTextField: "title",
            dataValueField: "id",
            dataSource: profile.surveys,
            filter: "contains",
            suggest: true,
            index: 3
          });
        }

        profile.getSurveyFromId = function(id){
            survey_ref.orderByChild("id").equalTo('ZgrlZ').on("child_added", function(snapshot) {
              return snapshot.val();
            });
          return {title: "testing"};
        };
      }
    ]);