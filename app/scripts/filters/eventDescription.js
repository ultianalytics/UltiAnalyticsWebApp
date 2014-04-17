// Generated by CoffeeScript 1.7.1
'use strict';
angular.module('newBetaApp').filter('eventDescription', function() {
  return function(event) {
    switch (event.action) {
      case 'Catch':
        return event.passer + ' to ' + event.receiver;
      case 'Drop':
        return event.receiver + ' dropped from ' + event.passer;
      case 'Throwaway':
        if (event.type === 'Offense') {
          return event.passer + ' throwaway';
        } else {
          return 'Opponent throwaway';
        }
      case 'Stall':
        return event.passer + ' stalled';
      case 'MiscPenalty':
        return event.passer + ' penalized (caused turnover)';
      case 'D':
        return 'D by ' + event.defender;
      case 'Pull':
        return 'Pull by ' + event.defender;
      case 'PullOb':
        return 'Pull (Out of Bounds) by ' + event.defender;
      case 'Goal':
        if (event.type === 'Offense') {
          return 'Our Goal (' + event.passer + ' to ' + event.receiver + ')';
        } else {
          return 'Their Goal';
        }
      case 'Callahan':
        return 'Our Callahan (' + event.defender + ')';
      case 'EndOfFirstQuarter':
        return 'End of 1st Quarter';
      case 'EndOfThirdQuarter':
        return 'End of 3rd Quarter';
      case 'EndOfFourthQuarter':
        return 'End of 4th Quarter';
      case 'EndOfOvertime':
        return 'End of an Overtime';
      case 'Halftime':
        return 'Halftime';
      case 'GameOver':
        return 'Game Over';
      case 'Timeout':
        return 'Timeout';
      default:
        return event.action;
    }
  };
});