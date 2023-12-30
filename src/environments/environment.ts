// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiEndpoint:'https://catalogkg.herokuapp.com/',
   apiEndpoint:'http://localhost:3000/',
  firebase: {
    apiKey: "AIzaSyAwSSMW0T96kj-iQsnobASZhPaC7x6V_vc",
    authDomain: "katalogkg-d0cdf.firebaseapp.com",
    projectId: "katalogkg-d0cdf",
    storageBucket: "katalogkg-d0cdf.appspot.com",
    messagingSenderId: "616675937901",
    appId: "1:616675937901:web:b28243aa69c9879af9f964",
    measurementId: "G-K6GSCQ8S0F"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
