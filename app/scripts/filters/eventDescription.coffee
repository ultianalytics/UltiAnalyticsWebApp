'use strict'

angular.module('newBetaApp')
  .filter 'eventDescription', () ->
    (event) ->
      switch event.action
        when 'Catch' then return event.passer + ' to ' + event.receiver
        when 'Drop' then return event.receiver + ' dropped from ' + event.passer;
        when 'Throwaway'
          return if event.type == 'Offense' then event.passer + ' throwaway' else 'Opponent throwaway'
        when 'Stall' then return event.passer + ' stalled'
        when 'MiscPenalty'then return event.passer + ' penalized (caused turnover)'
        when 'D' then return 'D by ' + event.defender
        when 'Pull' then return 'Pull by ' + event.defender
        when 'PullOb' then return 'Pull (Out of Bounds) by ' + event.defender
        when 'Goal' 
          return if event.type == 'Offense' then 'Our Goal (' + event.passer + ' to ' + event.receiver + ')' else 'Their Goal'
        when 'Callahan'
            return if event.type == 'Offense' then 'Their Callahan (' + event.passer + ')' else 'Our Callahan (' + event.defender + ')'
        when 'EndOfFirstQuarter' then return 'End of 1st Quarter'
        when 'EndOfThirdQuarter' then return 'End of 3rd Quarter'
        when 'EndOfFourthQuarter' then return 'End of 4th Quarter'
        when 'EndOfOvertime' then return 'End of an Overtime'
        when 'Halftime' then return 'Halftime'
        when 'GameOver' then return 'Game Over'
        when 'Timeout' then return 'Timeout'
        else return event.action