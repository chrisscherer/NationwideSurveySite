function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getSurveyById( id, callback ) {
  var ref = new Firebase("https://asurveyclone.firebaseio.com/surveys");

   ref.child('surveys/'+ id).once('value', function(snap) {
       callback( snap.val() );
   });
}

function findSurveyMatchingId( id ) {
  var ref = new Firebase("https://asurveyclone.firebaseio.com/surveys");

  var survey = {};

    ref.orderByChild("id").equalTo(id).limitToLast(1).on("child_added", function(snapshot) {
      survey = snapshot.val();
    });
    return survey;
}