/* global $, angular, jQuery */
// written by Jim Geppert

'use strict';

angular.module('newBetaApp')
  .service('api', function Rest($location) {
    var exports = {};
    // init the global app object
    var Ultimate = {};

    Ultimate.busyDialogStack = 0;

    // make sure we use the host from where we were loaded to prevent CORS from being used unnecessarily
    // (unless the page is loaded locally in which case just use the default host)
    var restHost = window.location.host.indexOf("ultimate-numbers.com") === -1 ? "www.ultianalytics.com" : "www.ultimate-numbers.com";
    Ultimate.baseRestUrl = "http://" + restHost + '/rest/view';

    // make sure we use the host from where we were loaded to prevent CORS from being used unnecessarily
    Ultimate.sessionId = new Date().getTime() + '';

    exports.retrieveState = function(teamId, stateId, stateType, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveState');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/state/' + stateType + '/' + stateId;
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    exports.saveState = function(teamId, stateType, data, successFunction, errorFunction) {
      sendAnalyticsEvent('saveState');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/state/' + stateType;
      sendRequest({
        url: url,
        dataType: 'json',
        isPost: true,
        data: data,
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    exports.retrieveTeam = function(id, includePlayers, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveTeam');
      var url = Ultimate.baseRestUrl + '/team/' + id;
      url = includePlayers ? url + '?players=true' : url;
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    function retrieveTeamForAdmin(id, includePlayers, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveTeamForAdmin');
      var url = Ultimate.baseRestUrl + '/admin/team/' + id;
      url = includePlayers ? url + '?players=true' : url;
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    exports.retrieveGames = function(teamId, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveGames');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/games';
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    exports.retrieveGamesData = function(teamId, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveGames');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/gamesdata';
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    function retrieveGamesForAdmin(teamId, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveGamesForAdmin');
      var url = Ultimate.baseRestUrl + '/admin/team/' + teamId + '/games';
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    exports.retrieveGame = function(teamId, gameId, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveGame');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/game/' + gameId;
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    function deleteGame(teamId, gameId, successFunction, errorFunction) {
      sendAnalyticsEvent('deleteGame');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/game/' + gameId + '/delete';
      sendRequest({
        url: url,
        dataType: 'json',
        isPost: true,
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    function deleteTeam(teamId, successFunction, errorFunction) {
      sendAnalyticsEvent('deleteTeam');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/delete';
      sendRequest({
        url: url,
        dataType: 'json',
        isPost: true,
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    function deletePlayer(teamId, playerToDelete, replacementPlayer, successFunction, errorFunction) {
      sendAnalyticsEvent('deletePlayer');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/player/delete?player=' + playerToDelete + '&replacement=' + replacementPlayer;
      sendRequest({
        url: url,
        dataType: 'json',
        isPost: true,
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    function renamePlayer(teamId, playerToRename, replacementPlayer, successFunction, errorFunction) {
      sendAnalyticsEvent('renamePlayer');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/player/rename?player=' + playerToRename + '&replacement=' + replacementPlayer;
      sendRequest({
        url: url,
        dataType: 'json',
        isPost: true,
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    exports.retrievePlayerStatsForGames = function(teamId, gameIds, successFunction, errorFunction) {
      sendAnalyticsEvent('retrievePlayerStatsForGames');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/stats/player';
      if (gameIds !== null && gameIds.length > 0) {
        url = url + '?gameIds=' + gameIds.join('_');
      }
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    exports.retrieveTeamStatsForGames = function(teamId, gameIds, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveTeamStatsForGames');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/stats/team';
      if (gameIds !== null && gameIds.length > 0) {
        url = url + '?gameIds=' + gameIds.join('_');
      }
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    exports.retrievePlayerStatsForEachGame = function(teamId, gameIds, successFunction, errorFunction) {
      sendAnalyticsEvent('retrievePlayerStatsForGames');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/stats/player/games';
      if (gameIds !== null && gameIds.length > 0) {
        url = url + '?gameIds=' + gameIds.join('_');
      }
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    exports.retrieveAllStatsForGames = function(teamId, gameIds, successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveAllStatsForGames');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/stats/all';
      if (gameIds !== null && gameIds.length > 0) {
        url = url + '?gameIds=' + gameIds.join('_');
      }
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    function retrieveTeams(successFunction, errorFunction) {
      sendAnalyticsEvent('retrieveTeams');
      var url = Ultimate.baseRestUrl + '/teams';
      sendRequest({
        url: url,
        dataType: 'json',
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    function retrievePlayerStatsForGame(options, successFunction, errorFunction) {
      sendAnalyticsEvent('retrievePlayerStatsForGame');
      var teamId = options.teamId;
      retrievePlayerStatsForGames(teamId, [options.gameId], successFunction, errorFunction);
    }

    function savePassword(teamId, password, successFunction, errorFunction) {
      sendAnalyticsEvent('savePassword');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/password/' + (isNullOrEmpty(password) ? 'REMOVE-PASSWORD' : password);
      sendRequest({
        url: url,
        dataType: 'json',
        isPost: true,
        success: successFunction,
        error: errorFunction || defaultError
      });
    }

    exports.signon = function(teamId, password, successFunction, errorFunction) {
            sendAnalyticsEvent('signon');
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/authenticate/' + password;
      sendRequest({
        url: url,
        dataType: 'json',
        isPost: true,
        success: successFunction,
        error: errorFunction || defaultError
      });
    };

    exports.urlForStatsExportFileDownload = function(teamId, games) {
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/stats/export';
      if (games) {
        var sortedGames = sortGames(games);
        var gameIds = collectGameIds(sortedGames);
        if (gameIds !== null && gameIds.length > 0) {
          url = url + '?gameIds=' + gameIds.join('_');
        }
      }
      return url;
    };

    function urlForGameExportFileDownload(teamId, gameId) {
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/export/game/' + gameId + '?players=true';
      return url;
    }

    function urlForGameExportFileUpload(teamId) {
      var returnUrl = encodeURIComponent('/team/admin#teamgamespage?team=' + teamId);
      var url = Ultimate.baseRestUrl + '/team/' + teamId + '/import/game?return=' + returnUrl;
      return url;
    }

    function sendRequest(request) {
      var options = {
        success: function(data, textStatus, jqXHR) {
          busyDialogEnd();
          var responseTypeReceived = jqXHR.getResponseHeader('Content-Type');
          if (isExpectedResponseType(request, jqXHR)) {
            request.success(data, textStatus, jqXHR);
          } else {
            logRequestFailure(jqXHR, 'unexpected response type = ' + responseTypeReceived);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          busyDialogEnd();
          var error = logRequestFailure(jqXHR, textStatus, errorThrown);
          if (request.error) {
            request.error(jqXHR, textStatus, errorThrown);
          } else {
            throw error;
          }
        }
      };
      if (request.dataType) {
        options.dataType = request.dataType;
      }
      if (request.isPost) {
        options.type = 'POST';
        options.contentType = 'application/json';
      }
      if (request.data) {
        options.data = request.data;
      }
      busyDialogStart();
      Ultimate.sessionId = 'foo ';
      var url = addQueryStringParameter(request.url, 'cachebuster ', Ultimate.sessionId);
      options.xhrFields = {
        withCredentials: true
      };
      $.ajax(url, options);
    }

    function isExpectedResponseType(request, responseTypeReceived) {
      if (request.expectedResponseType) {
        if (responseTypeReceived.indexOf(request.expectedResponseType) < 0) {
          return false;
        }
      }
      return true;
    }

    function addCommas(nStr) {
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    }

    function logRequestFailure(jqXHR, textStatus, errorThrow) {
      var error = errorDescription(jqXHR, textStatus, errorThrow);
      logError(error);
      return error;
    }

    function errorDescription(jqXHR, textStatus, errorThrow) {
      return 'ERROR: status ' + jqXHR.status + ' (' + textStatus + ') ' + errorThrow + (jqXHR.responseText ? ' \n' + jqXHR.responseText : '');
    }

    function getParameterByName(name) {
      var parts = window.location.href.split('?'); // jQM seems to pass odd urls sometimes (previous qs before current qs)
      var queryString = '?' + parts[parts.length - 1];
      var match = new RegExp('[?&]' + name + '=([^&]*)').exec(queryString);
      var value = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      return value;
    }

    function logError(error) {
      if (window.console) {
        console.log(error);
      }
    }

    // descending date-ordered list
    function sortGames(games) {
      var sortedGames = games.sort(function(a, b) {
        var first = a.msSinceEpoch ? a.msSinceEpoch : 0;
        var second = b.msSinceEpoch ? b.msSinceEpoch : 0;
        return second - first;
      });
      return sortedGames;
    }

    function collectGameIds(games) {
      var gameIds = [];
      $.each(games, function() {
        gameIds.push(this.gameId);
      });
      return gameIds;
    }


    // answer an array of object: {id: '
    //             TOURNAMENT - Centex - 2012 ', name: '
    //             Centex ', year: 2012, games:['
    //             game1234 ', '
    //             game345 ']} in reverse chrono order
    function getTournaments(games) {
      var tournamentsList = [];
      if (games && games.length > 0) {
        var sortedGames = sortGames(games);
        var tournamentGames = {};

        jQuery.each(sortedGames, function() {
          var name = this.tournamentName;
          if (name) {
            var year = this.msSinceEpoch ? new Date(this.msSinceEpoch).getFullYear() : '';
            var id = 'TOURNAMENT - ' + name + ' - ' + year;
            if (!tournamentGames[id]) {
              tournamentGames[id] = [];
              tournamentsList.push({
                id: id,
                name: name,
                year: year
              });
            }
            tournamentGames[id].push(this.gameId);
          }
        });

        jQuery.each(tournamentsList, function() {
          this.games = tournamentGames[this.id];
        });

        return tournamentsList;
      }
      return [];
    }

    function getInternetExplorerVersion(){
    // Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
      var rv = -1; // Return value assumes failure.
      if (navigator.appName == 'Microsoft Internet Explorer ') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE([0 - 9] {1, }[\.0 - 9] {0, }) ');
        if (re.exec(ua) !== null) rv = parseFloat(RegExp.$1);
      }
      return rv;
    }

    function log(message) {
      if (window.console) {
        console.log(message);
      }
    }

    function isNullOrEmpty(s) {
      return s == null || jQuery.trim(s) == '';
    }

    function busyDialogStart() {
      Ultimate.busyDialogStack++;
      if (Ultimate.busyDialogStack == 1) {
        $('.hideWhenBusy ').addClass('hidden ');
        $('.spinner ').removeClass('hidden ');
      }
    }

    function busyDialogEnd() {
      Ultimate.busyDialogStack--;
      if (Ultimate.busyDialogStack == 0) {
        resetBusyDialog();
      }
    }

    function resetBusyDialog() {
      $('.spinner ').addClass('hidden ');
      showHiddenWhenBusyElements();
      Ultimate.busyDialogStack == 0;
    }

    /*
    Creates a canonical string representation of the object which can be used for comparison or subsequent hash creation.
    The object will be deeply recursed to find all objects.
    Circular references are handled automatically (an object will not be re-visited once it has been handled).
    Thread-safe (designed to be a singleton)
    */
    Ultimate.Canonicalizer = function() {
      /*
        Return a canonical string of the object.
        Undefined properties are skipped.
        options: {
        treatNullAsUndefined: boolean  By default NULL properties will be written.  To treat nulls like undefined specify treatNullAsUndefined
        treatEmptyStringsAsUndefined: boolean  By default empty string properties will be written.  To treat empty strings like undefined specify treatEmptyStringsAsUndefined
        <propertyName>: boolean   By default all other properties of an object are navigated.  To ignore a certain property add it to the options with value of true.
        */
      this.toCanonicalString = function(object, options) {
        var allProps = [];
        var visitedObjects = [];
        pushObject(object, allProps, options, 0, visitedObjects);
        return allProps.join('');
      };

      function pushObject(obj, allProps, options, level, visitedObjects) {
        if (typeof obj == 'object' && obj !== null) {
          var visitedReference = getVisitedReference(obj, visitedObjects);
          if (visitedReference) {
            allProps[allProps.length] = visitedReference;
          } else {
            visitedObjects.push(obj);
            var props = [];
            for (var prop in obj) {
              props.push(prop);
            }
            props = props.sort();
            for (var i = 0; i < props.length; i++) {
              var childObj = obj[props[i]];
              if (shouldPush(childObj, options, props[i])) {
                allProps[allProps.length] = '\n';
                for (var j = 0; j < level; j++) {
                  allProps[allProps.length] = '.';
                }
                allProps[allProps.length] = props[i];
                allProps[allProps.length] = ':';
                pushObject(childObj, allProps, options, level + 1, visitedObjects);
              }
            }
          }
        } else {
          allProps[allProps.length] = obj == null ? 'null' : obj;
        }
      }

      function shouldPush(value, options, propName) {
        if (propName && options[propName]) {
          return false;
        } else if (typeof value == 'function' || value === undefined) {
          return false;
        } else if (options.treatNullAsUndefined && value === null) {
          return false;
        } else if (options.treatEmptyStringsAsUndefined && value == '') {
          return false;
        }
        return true;
      }

      function getVisitedReference(object, visitedObjects) {
        for (var i = 0; i < visitedObjects.length; i++) {
          if (visitedObjects[i] === object) {
            return '@REF' + i;
          }
        }
        return null;
      }

    };

    function showHiddenWhenBusyElements() {
      $('.hideWhenBusy').removeClass('hidden');
    }

    function hideHiddenWhenBusyElements() {
      $('.hideWhenBusy').addClass('hidden');
    }

    function addQueryStringParameter(url, key, value) {
      return url + (url.indexOf('?') > 0 ? '&' : '?') + key + '=' + value;
    }

    function resetCacheBuster() {
      Ultimate.sessionId = new Date().getTime() + '';
    }

    function sendAnalyticsEvent(restEndpointName) {
      // NOTE: You can add another property for more detail
      if (_.contains($location.host().toLowerCase(), 'ultimate-numbers') || _.contains($location.host().toLowerCase(), 'ultianalytics'))
        _gaq.push(['_trackEvent', Ultimate.isAdminSite ? 'WebRestRequest-Admin' : 'WebRestRequest', restEndpointName]);
    }

    function defaultError(e){
      throw e;
    }
    // AngularJS will instantiate a singleton by calling 'new' on this function
    return exports;
  });