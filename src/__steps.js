/**
 * -------------------------------------
 *          INITIAL INSTALLATION
 *--------------------------------------
 *  1. visit: (console.firebase.google.com)
 * 2. create project (skip google analytis)
 * 3. Register app (create config)
 * 4. Install firebase
 * 5. Add config file to my project
 * 6. DANGER: Do not publish or make firebase config to public by pushing those to github
 * -------------------------------------
 *          INTREGATION
 * -------------------------------------
 * 7. Go to docs > Build > Authentication > Web > Get started
 * 8. export app from firebase.config.js file: export default app
 * 9. Login.jsx: import getAuth from "firebase/auth"
 * 10. create const auth = getAuth(app)
 * -------------------------------------
 *          PROVIDER SETUP
 * -------------------------------------
 * 11. import GoogleAuthProvider and create a new provider
 * 12. use signInWithPopUp and pass auth and provider
 * 13. Activate sign in method (google, facebook, github etc)
 * 14. [vite]: change 127.0.0.1 to localhost
 * -------------------------------------
 *          More Auth Provider
 * -------------------------------------
 * 15. Activate the auth provider (create app, provide redirect url, client id, client secret)
 * 16. 
 */
