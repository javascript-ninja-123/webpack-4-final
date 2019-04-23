import * as firebase from 'firebase/app';
 
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDqe5d0lV9LeGmxg9ufqHrJ5L4WQxz1Qg4",
    authDomain: "slack-rect-aman.firebaseapp.com",
    databaseURL: "https://slack-rect-aman.firebaseio.com",
    projectId: "slack-rect-aman",
    storageBucket: "slack-rect-aman.appspot.com",
    messagingSenderId: "282295280659"
  };

const fb = firebase.initializeApp(config);

/**
 * @description this is a firebase module 
 */
class Firebase{
    constructor(){

    }
    static async signUp({email,password}){
        try{
            await fb.auth().createUserWithEmailAndPassword(email,password)
        }
        catch(err){
            throw new Error("was not able to login")
        }
    }
}


export default Firebase;