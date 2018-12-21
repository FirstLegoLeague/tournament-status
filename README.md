# Tournament Status

### Rational
Keeping the Robot matches running according to the schedule is important because
1. match schedules are often interleaved with other activities such as Judging sessions
1. teams need to know when to get to the queuing area. Field queuers need to know when to call teams. If matches are not running on time then they can't know when to be ready
1. Tournament organizers have other time constraints too, and will want competitions to finish on time.

A display driven by the Schedule and Timer Module will help the Robot Competition Area (RCA) manager, the MCs, the Head Ref and the Head Queuer keep the matches on time.

You can read more [here](rga-status.md)

## Techincal details
This module is a `web` module (see the [Module Standard](https://github.com/FirstLegoLeague/architecture/blob/master/module-standard/v1.0-SNAPSHOT.md)). It runs on [react-js](https://reactjs.org/).

## Development
1. Fork this repository or create your own branch here
2. make some changes
3. create a Pull Request
4. Wait for a CR from the code owner
5. make sure everything is well
6. merge

### To run in development
* Run `yarn install` first
* Run `yarn start` to run the `webpack-dev-server`

### To Publish to NPM
You must publish the subdirectory `dist` to NPM instead of the whole module, so use the designed script `./bin/publish.sh`. Run it from the shell/git-bash/msys2/any other Linux CLI

### A few things to notice while developing:
* Use `yarn` not `npm`
* Follow javascript standard as described [here](https://standardjs.com/)
* Keep the service lightweight
* Follow the API of the other modules.
* Be creative and have fun
