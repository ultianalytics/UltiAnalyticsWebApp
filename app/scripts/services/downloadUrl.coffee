'use strict'

angular.module('newBetaApp')
  .factory 'downloadUrl',['$routeParams', 'api', ($routeParams, api) -> 
    return api.urlForStatsExportFileDownload $routeParams.teamId, null
]