export const drawRect = (detections, ctx,colorMap) =>{
    detections.forEach(prediction => {
  
      const [x, y, width, height] = prediction['bbox']; 
      const text = prediction['class']; 
      const score = prediction['score']; 

      if (!colorMap[text]){
        colorMap[text] = '#' + Math.floor(Math.random()*2**24).toString(16);
      }

      ctx.strokeStyle =  colorMap[text]
      ctx.font = '20px Arial';
      console.log(colorMap)
      ctx.beginPath();   
      ctx.fillStyle =  colorMap[text]
      ctx.fillText(text+" "+Math.round(score * 100) / 100, x, y);
      ctx.rect(x, y, width, height); 
      ctx.stroke();
    });
  }
  