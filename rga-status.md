# FIRST LEGO League robot competition area Tournament Status Module


## Terminology
* Match: Teams runs their robot for 2:30 minutes. At most competitions multiple matches run simultaneously. In this document the term `Match` means all team matches running simultaneously.
* Round: Sequence of Matches where all teams at the competition complete a match. Example: Scoring Round 2.
* Stage: A set of Rounds. Example: At most competitions there will be a Scoring Stage that comprises three Scoring Rounds
* Match Number: This will be the match that is about to start.
* Timer Module: Module that manages the match timer.
* Schedule: Sequence of matches in a Stage.
## Rational
Keeping the Robot matches running according to the schedule is important because
1. match schedules are often interleaved with other activities such as Judging sessions
1. teams need to know when to get to the queuing area. Field queuers need to know when to call teams. If matches are not running on time then they can't know when to be ready
1. Tournament organizers have other time constraints too, and will want competitions to finish on time.

A display driven by the Schedule and Timer Module will help the Robot Competition Area (RCA) manager, the MCs, the Head Ref and the Head Queuer keep the matches on time.

## Tournament Status Timer
The `Tournament Status Timer` will show whether, at a particular point in time, the upcoming  match is on time, ahead of time, or behind time. 

Examples:

* 0:00 - The time is 13:00 and the next match is scheduled to start at 13:00
* +5:00 - The time is 12:55 and the next match is scheduled to start at 13:00
* -2:00 - The time is 13:02 the next match was scheduled to start at 13:00

If the display shows +5:00 and the upcoming teams are in the queuing area then the tournament officials gently start moving the previous teams out of the RCA.

However, if the display shows +2:00 and the previous teams are still discussing their scoresheets with the referees, this will be an indication to the head referee to hurry up her referees.

If the display shows -2:00 and the match has not started, this is a signal to the head referee to step in and assist the table that is holding the start of the match.

## Display Colors
* +2:00 minutes and above - GREEN
* Between +2:00 and -2:00 minutes - YELLOW
* -2:00 minutes and above (negative) - RED

These thresholds should be configurable (maybe not in 1st release).

## Components

There module will have two components
* A backend that will manage the `Match Number`, make API calls, and provide a response to client API calls.
* A frontend display that will show the `Tournament Status Timer`.

## Input information required by Tournament Status module
The status timer will require the following data:

1. Match schedule, including, per match
   * `Match Number` - 1st match in a stage is numbered #1, match number is not restarted between rounds of the same stage.
   * match starting time - hh:mm:ss
   * team number for [Next Up](#Next-Up)
   * team name for [Next Up](#Next-Up)
1. Timer events
   * `Match Start` indication
   * `Match End` indication
   * `Match Aborted` indication
1. `Match Number` update
   * To handle situations where the internal match number gets out of sync with the real match number, there needs to be a way whereby the Timekeeper/Head Referee can manually set the match number.
1. Schedule loaded or updated
   * Trivial case - system startup

## Method of Operation
When the Tournament Management System starts, the status display will show the time remaining until the start of the 1st match. This number will be positive and will count down till 0:00

If the 1st match does not start on time, the status display will start to count up and will show a negative number.

When the `Match Start` event is received, the internal `Match Number` counter will be incremented, and the status display will be updated to show the time remaining until the scheduled start of the next match. In other words, during the current running match, the status display will show the countdown timer till the start of the next match.

When the `Match Aborted` event is received, the status display countdown will not be affected and will continue to show the time remaining until the next match, but the subsequent `Match Start` event will not increment the `Match Number`. The rational for this is that all the teams are at the tables and it's not interesting to know by how much the start of the current match is delayed. The tounament officials will be more interested to know how much time they have until the scheduled start of the next match.

When the `Match Number` update event is received, the internal `Match Number` is updated and the status display will show the time to this `Match Number`.

# Data maintained by the module
The module will maintain and update the following items of information:

* `Next Match Number` - the next match to be run. Will be updated when the `Match Start` event is received.
* `Current Match Number` - similar to the `Next Match Number` except that it is updated when the `Match End` event is received, ie, during a Match it will be 1 less than the `Current Match Number` but at other times the two values will be the same. This data will be retured in an API to clients that want to display the match that is currently running.
* Tournament Status Timer - difference between current time and the scheduled starting time of the next match.

# Next Up
Since the `Tournament Status Module` keeps track of the current match number, it can provide clients with `Next Up` data. This data will include:

* Next match number
* Next match team numbers
* Next match team names
* Next match starting time

The `Next Up` data will include information for the following two matches.

The availability of new `Next Up` data will be announced via MHub (i.e. clients can subscribe to it) and can be fetched via a REST API call.

## APIs
* Next Up
* Current Match Number

# UX
## Tournament Status Timer Display
The target screen will be a computer screen (approx 19 inch). Design TBD
## MC Display
The MC target display will be Tablet or Phone sized. Information will include
* Current time
* Tournament Status Timer
* Next Up team numbers