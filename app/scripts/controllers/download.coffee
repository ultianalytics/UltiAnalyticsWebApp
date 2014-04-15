angular.module('newBetaApp')
  .controller 'DownloadCtrl', ['$scope', 'downloadUrl',($scope, downloadUrl) -> 
    $scope.url = downloadUrl
  ]