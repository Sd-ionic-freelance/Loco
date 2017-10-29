angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl',function($scope,$cordovaAppVersion,$cordovaAppRate,$cordovaCamera,$cordovaLocalNotification,$cordovaBadge) {
  
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  document.addEventListener("deviceready", function () {
      $cordovaAppVersion.getVersionNumber().then(function (version) {
          var appVersion = version;
          console.log(appVersion);
      });
      
      $cordovaBadge.hasPermission().then(function(yes) {
        $cordovaBadge.set(3).then(function() {
          // You have permission, badge set.
        }, function(err) {
          // You do not have permission.
        });
      }, function(no) {
        // You do not have permission
        alert("NO");
      });
      
  }, false);
  $scope.appRate=function(){
    $cordovaAppRate.promptForRating(true).then(function (result) {
        // success
    });   
  };
  
  $scope.getCamera=function(){
    var options = {
      quality: 30,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });  
  };
  
  $scope.scheduleDelayedNotification = function () {/*EVERY MIN*/
    $cordovaLocalNotification.schedule({
      id: 1,
      title: 'Title here',
      text: 'Text here',
      every: 'minute'
    }).then(function (result) {
      console.log(result);
    });
  };
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
