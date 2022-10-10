import { Storage } from "aws-amplify";
import { createCanvas, loadImage } from "canvas";
import template from "./template.png";
function certificateGeneration(props) {
  var date = new Date(props.event["time"]);
  var uncleanArray = JSON.parse(props.event["attendees"]);

  //Cleans the Attendees JSON Array of duplicate elements.
  const clean = (arr, prop) =>
    arr.reduce((accumulator, currentValue) => {
      if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);
  var cleanArray = clean(uncleanArray, "email");
  console.log(uncleanArray);
  console.log(cleanArray);

  for (let i = 0; i < cleanArray.length; i++) {
    loadImage(template).then((image) => {
      const canvas = createCanvas(1000, 750);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, 1000, 750);
      ctx.font = "bold italic 50px Sans";
      ctx.textAlign = "center";
      ctx.fillStyle = "#364d65";
      ctx.fillText(
        cleanArray[i]["name"] +
          " " +
          cleanArray[i]["middle_name"] +
          " " +
          cleanArray[i]["family_name"],
        500,
        350
      );
      ctx.font = "bold 20px Sans";
      ctx.fillText([props.event["name"]], 500, 480);
      ctx.font = "17px Sans";
      ctx.fillText(" held on", 500, 510);
      ctx.font = "bold 20px Sans";
      ctx.fillText(
        date.getDate() +
          "-" +
          date.getMonth() +
          "-" +
          date.getFullYear() +
          " " +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        500,
        540
      );
      var data = canvas.toDataURL("image/png", 0.3);
      function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(",")[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
      }
      var blob = dataURItoBlob(data);

      uploadCertificate(blob);
    });

    async function uploadCertificate(data) {
      await Storage.put(
        "certificates/" +
          cleanArray[i]["email"] +
          "/" +
          props.event["id"] +
          ".png",
        data
      );
    }
  }
}

export default certificateGeneration;
