"use client"
import React, { use, useEffect, useRef } from 'react'
import Webcam from 'react-webcam';
import './customstyle.css';
import { Separator } from '@/components/ui/separator';
// import * as cocossd from '@tensorflow-models/coco-ssd';
// import "@tensorflow/tfjs-backend-cpu";
// import "@tensorflow/tfjs-backend-webgl";
type Props = {}


const Page = (Props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  
  // const[model,setmodel]=useState<ObjectDetection>();
  // useEffect(() => {
  //   initModel();
  // },[]);
  return (
    <body>
      <div className='header'>
        Header content goes here
      </div>
        <div className='cambox'>
          <Webcam ref={webcamRef} mirrored className='webcamclass' />
          <canvas ref={canvasRef}
          className='canvasclass'></canvas>
        </div>
        <Separator className='separator'/>
        <div className='container'>
            <button className='box'>Record</button>
            <button className='box'>Auto Record</button>
            <button className='box'>Capture</button>

        </div>
        <Separator className='separator'/>
        <div className='footer'>
        Footer content goes here
      </div>
    </body>
    
  );
};

export default Page;