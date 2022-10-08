import { createCanvas, loadImage } from 'canvas';
import template from './template.png'
  function certificateGeneration(props) {
    var name = props.event['name']
    var date = new Date(props.event['time'])
    var uncleanArray = JSON.parse(props.event['attendees'])
  
    //Cleans the Attendees JSON Array of duplicate elements.
    function clean(unCleanArray) {
      var cleanArray = unCleanArray.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.save === arr.save && t.State === arr.State)))
      return cleanArray
    }
    var cleanArray = clean(uncleanArray)

    for (let i = 0; i < cleanArray.length; i++) {
      
      loadImage(template).then( (image) => {
        const canvas = createCanvas(1000, 750)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, 1000, 750)
        ctx.font = 'bold italic 50px Sans'
        ctx.textAlign = "center"
        ctx.fillStyle = '#364d65'
        ctx.fillText(cleanArray[i]['name']+" "+cleanArray[i]['middle_name']+" "+cleanArray[i]['family_name'], 500, 350)
        ctx.font = 'bold 20px Sans'
        ctx.fillText([props.event['name']], 500, 480)
        ctx.font = '17px Sans'
        ctx.fillText("on", 500,510)
        ctx.font = 'bold 20px Sans'
        ctx.fillText(date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+" "+date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), 500, 540)
        var data = canvas.toDataURL('image/png',0.3)
        download(data,cleanArray[i]['email']+'.png')
      })

      const download = (dataUrl, filename) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = filename;
        link.click();
      };

    }
  }

  export default certificateGeneration;