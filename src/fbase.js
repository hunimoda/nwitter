import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBUm_UrDh7vjdZSdnI0tJpi5oVKzIF25uY",
	authDomain: "nwitter-e716b.firebaseapp.com",
	projectId: "nwitter-e716b",
	storageBucket: "nwitter-e716b.appspot.com",
	messagingSenderId: "87432958778",
	appId: "1:87432958778:web:20a9db38e60a83461b3603",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.firestore();
