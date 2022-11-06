function CheckConnectivity() {
  var condition = navigator.onLine ? "online" : "offline";
  if (condition === "online") {
    console.log("ONLINE");
    fetch("https://www.google.com/", {
      // Check for internet connectivity
      mode: "no-cors",
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  } else {
    return false;
  }
}

export default CheckConnectivity;
