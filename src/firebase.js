import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAvKABIYHlTXoc66iSfX1xx9Oz_AZDbdMk",
    authDomain: "streetloto-3cafe.firebaseapp.com",
    projectId: "streetloto-3cafe",
    storageBucket: "streetloto-3cafe.appspot.com",
    messagingSenderId: "525496271590",
    appId: "1:525496271590:web:7dba85b4a0a1ffcbeff127"
}

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)

export const getRegistrationToken = async () => {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
        try {
            const token = await getToken(messaging, {
                vapidKey: "BCc_b15nj-9LE_om8rWrVDiebBcnM9Mr28rOe3vfkOnr6k_LWZaPkEOmKPz-FXSk3vy8XyivPWEr6_EyTmnk8-Y",
            })

            if (token) {
                return token
            }
            else {
                console.log("Failed to obtain token. Allow notifications.")
            }
        } catch (error) {
            console.log("Error receiving token")
        }
    }
}

export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload)
        })
    })
}

export default app