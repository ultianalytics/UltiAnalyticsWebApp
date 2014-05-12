'use strict';
// gotta get that footer positioned properly. This seemed like a good spot for some errant code.


angular.module('newBetaApp', [
  'ngRoute',
  'ngAnimate',
  'ngCookies'
])
  .config(['$routeProvider',
    function($routeProvider) {
      function checkAuth($location, Authorization, next) {
        next.set($location.path());
        return Authorization.ping($location.url().match(/^\/\d+/)[0].slice(1));
      }
      function logRoute($location){
        if (_.contains($location.host().toLowerCase(), 'ultimate-numbers') || _.contains($location.host().toLowerCase(), 'ultianalytics')){
          var pageRoute = $location.url().replace(/\/\d+\//, '').match(/\w+/)[0]
          ga('send', 'pageview', {
            'page': pageRoute,
            'title': pageRoute.slice(0,1).toUpperCase() + pageRoute.slice(1)
          });
        }
      }

      $routeProvider
        .when('/', {templateUrl: 'views/splash.html', resolve: {ga: logRoute}})
        .when('/:teamId/login', {templateUrl: 'views/login.html', controller: 'LoginCtrl', resolve: {ga: logRoute}})
        .when('/:teamId/players', {templateUrl: 'views/players.html', controller: 'PlayersCtrl', resolve: {authorized: checkAuth, ga: logRoute}})
        .when('/:teamId/team', {templateUrl: 'views/team.html', controller: 'TeamCtrl', resolve: {authorized: checkAuth, ga: logRoute}})
        .when('/:teamId/download', {templateUrl: 'views/download.html', controller: 'DownloadCtrl', resolve: {authorized: checkAuth, ga: logRoute}})
        .when('/:teamId/line', {templateUrl: 'views/line.html', controller: 'LineCtrl', resolve: {authorized: checkAuth, ga: logRoute}})
        .when('/:teamId/games', {templateUrl: 'views/games.html', controller: 'GamesCtrl', resolve: {authorized: checkAuth, ga: logRoute}})
        .when('/:teamId/player/:playerNameUri', {templateUrl: 'views/player.html', controller: 'PlayerCtrl', resolve: { authorized: checkAuth, ga: logRoute}})
        .when('/404', {templateUrl: 'views/404.html', controller: '404Ctrl'})
        .otherwise({redirectTo: '/404'});
    }
  ]);