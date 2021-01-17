// import React from 'react';
// import {
//   Machine,
//   State,
//   actions,
//   assign,
//   send,
//   sendParent,
//   interpret,
//   spawn
// } from 'xstate';

// export const homeMachine = Machine({
//   id: 'home',
//   initial: 'initializing',
//   context: {
//     user: null
//   },
//   states: {
//     initializing: {
//       always: [
//         { target: 'userSetup', cond: 'didPlayerWin' },
//         { target: 'lose', cond: 'didPlayerLose' }
//       ]
//     },
//     userSetup: {},
//     home: {}
//   }
// },
// {
//   actions: {
//     setUser: assign({ user: (context, event) => event.data }),
//     logout: assign({  })
//   },
//   guards: {
//     userIsSetup: (context, event) => 
//   }
// });

// export const authenticationService = interpret(authenticationMachine)

