import { DetectedObject, ObjectDetection } from '@tensorflow-models/coco-ssd';


export function drawOnCanvas(predictions: DetectedObject[],ctx:CanvasRenderingContext2D|null|undefined) 
{
    predictions.forEach((detectedObject: DetectedObject) => {
        const {class: name,bbox,score}=detectedObject;
        const[x,y,width,height]=bbox;

        if (ctx) {
            ctx.beginPath();

            ctx.fillStyle = name === 'person' ? 'green' : 'red';
            ctx.globalAlpha=0.4;

            ctx.roundRect(x,y,width,height,8);
            ctx.fill();

            ctx.font="12px Courier New";
            ctx.globalAlpha=1;
            ctx.fillText(name,x,y);

        }

    });
    
    
}