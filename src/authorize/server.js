var admin = require("firebase-admin");

var serviceAccount = require("./service-account-file.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// This registration token comes from the client FCM SDKs.
const registrationToken =
  "cnrynP3sRnOeNL83okGtr9:APA91bFU3LsMJv4cYWRNP72W5iZ8V0cTWSk924j07c95PMFo-RNAzi1VJ2O4Xm4a27E9nnkNrwXfyxz-JiVwBRj_wKnQ6Qh4AtOUCxcleLZAqEpLrdYbGtnEncz3EniQYgilGLiZ9l1_";

const message = {
  notification: {
    title: "Phone Call!",
    body: "Dung is Calling",
  },
  android: {
    notification: {
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/voicecall-22af1.appspot.com/o/accept-call.png?alt=media&token=2721dd3b-00a1-4d37-a350-53b57e459a4a",
      color: '#7e55c3'
    },
  },
  apns: {
    payload: {
      aps: {
        "mutable-content": 1,
      },
    },
    fcm_options: {
      image: "https://firebasestorage.googleapis.com/v0/b/voicecall-22af1.appspot.com/o/accept-call.png?alt=media&token=2721dd3b-00a1-4d37-a350-53b57e459a4a",
    },
  },
  webpush: {
    headers: {
      image: "https://firebasestorage.googleapis.com/v0/b/voicecall-22af1.appspot.com/o/accept-call.png?alt=media&token=2721dd3b-00a1-4d37-a350-53b57e459a4a",
    },
  },
  token: registrationToken,
};

// Send a message to the device corresponding to the provided
// registration token.
admin
  .messaging()
  .send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });
