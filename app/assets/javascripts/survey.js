var myApp = angular.module("new-survey", ["firebase", 'ui.bootstrap']);

      myApp.controller("MyController", ["$scope", "$firebaseArray",
        function($scope, $firebaseArray) {
          //CREATE A FIREBASE REFERENCE
          var ref = new Firebase("https://asurveyclone.firebaseio.com/surveys");

          $scope.surveys = $firebaseArray(ref);

          var surveyList = this;

          surveyList.questions = [];

          surveyList.addQuestion = function() {
            surveyList.questions.push({text:surveyList.questionText, answers: [], id: surveyList.questions.length});
            surveyList.questionText = '';
          };

          surveyList.removeQuestion = function(index) {
            surveyList.questions.splice(index, 1);
          };

          surveyList.addAnswer = function(qId) {
            surveyList.questions[qId].answers.push({text:surveyList.answerText, qId: qId});
            surveyList.answerText = '';
          };

          surveyList.removeAnswer = function(qId, index) {
            surveyList.questions[qId].answers.splice(index, 1);
          };

          surveyList.submitSurvey = function() {
            $scope.surveys.$add({
                title: surveyList.title,
                description: surveyList.description,
                questions: surveyList.questions,
                author: getCookie("username"),
                id: makeid()
            });
            surveyList.questions = [];
            surveyList.title = "";
            surveyList.description = "";
          };

          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };
        }
      ]);

var survey_index = angular.module("survey-index", ["firebase", 'ui.bootstrap']);

      survey_index.controller("MyController", ["$scope", "$firebaseArray",
        function($scope, $firebaseArray) {
          //CREATE A FIREBASE REFERENCE
          var ref = new Firebase("https://asurveyclone.firebaseio.com/surveys");

          $scope.surveys = $firebaseArray(ref);

          var surveyList = this;

          surveyList.questions = [];
          surveyList.surveys = $scope.surveys;

          surveyList.showSurvey = function(id) {
            setCookie("survey_id", id, 2, "");

            document.location.replace("/survey/show");
          }

          surveyList.submitSurvey = function() {
            $scope.surveys.$add({
                title: surveyList.title,
                description: surveyList.description,
                questions: surveyList.questions,
                author: getCookie("username"),
                id: makeid()
            });
            surveyList.questions = [];
            surveyList.title = "";
            surveyList.description = "";
          };

          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };
        }
      ]);

var show_survey = angular.module("show-survey", ["firebase", 'ui.bootstrap']);

      show_survey.controller("MyController", ["$scope", "$firebaseArray",
        function($scope, $firebaseArray) {
          //CREATE A FIREBASE REFERENCE
          var survey_ref = new Firebase("https://asurveyclone.firebaseio.com/surveys");
          var response_ref = new Firebase("https://asurveyclone.firebaseio.com/responses");

          $scope.surveys = $firebaseArray(survey_ref);
          $scope.response = $firebaseArray(response_ref);
          $scope.response.answers = [];

          var survey = this;

          survey_ref.orderByChild("id").equalTo(getCookie("survey_id")).limitToLast(1).on("child_added", function(snapshot) {
            survey.survey_info = snapshot.val();
            $scope.response.answers = survey.survey_info.questions.answers;
          });

          survey.submitResponse = function() {
            $scope.response.$add({
                answers: $scope.response.answers,
                respondee: getCookie("username"),
                survey_id: getCookie("survey_id")
            });
            deleteCookie("survey_id");
            window.location.replace("/");
          };

          survey.debug = function() {
            console.log("answers");
            console.log($scope.response.answers);
            console.log("response");
            console.log($scope.response);
          }

          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };
        }
      ]);

$('document').ready(function(){
  //console.log('ready');
});