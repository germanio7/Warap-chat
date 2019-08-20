import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

window.Echo = new Echo({
    broadcaster: "pusher",
    auth: {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accsess_token")
        }
    },
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    // encrypted: true,
    wsHost: window.location.hostname,
    wsPort: 6001
});
