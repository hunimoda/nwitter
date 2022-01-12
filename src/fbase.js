import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBUm_UrDh7vjdZSdnI0tJpi5oVKzIF25uY",
	authDomain: "nwitter-e716b.firebaseapp.com",
	projectId: "nwitter-e716b",
	storageBucket: "nwitter-e716b.appspot.com",
	messagingSenderId: "87432958778",
	appId: "1:87432958778:web:20a9db38e60a83461b3603",
};

initializeApp(firebaseConfig);

export const authService = getAuth();
