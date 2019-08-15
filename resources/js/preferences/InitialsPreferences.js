import axios from "axios";

// Nombre de la aplicación
let aplicationName = window.localStorage.getItem("appName");
if (!aplicationName) {
    axios
        .get("/api/preferences")
        .then(response => {
            window.localStorage.setItem("appName", response.data.appName);
            document.getElementById("appTitle").innerHTML =
                response.data.appName;
        })
        .catch(error => {
            console.log(error);
        });
}

document.getElementById("appTitle").innerHTML =
    window.localStorage.getItem("appName") || "";

export default "preferences complete";
