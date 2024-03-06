"use client"
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam';
import './customstyle.css';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/theme-toggle';
import Button from '@material-ui/core/Button';
import { Camera, CameraIcon, VideoIcon } from 'lucide-react';

type Props = {}


const Page = (Props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 

  //state

  const [isRecording, setIsRecording]=useState<boolean>(false);

  return (
    <body>
      <button>

      </button>
      <div className='header'>
      Survellience-Footage-Optimization
      </div>
        <div className='cambox'>
          <Webcam ref={webcamRef} mirrored className='webcamclass' />
          <canvas ref={canvasRef}
          className='canvasclass'></canvas>
        </div>
        <Separator className='separator'/>
        <ModeToggle></ModeToggle>

        <div className='container'>
          <button  className='box' onClick={userPromptScreenshot}><CameraIcon/>Capture</button>
          <button className='box'  onClick={userPromptRecord}><VideoIcon/>Auto Record</button>
          {/* <button className='box'  onClick={}><VideoIcon/>manual record</button> */}
        </div>

        <Separator className='separator'/>
        <div className='footer'>
        Footer content goes here
      </div>
    </body>
    
  );
  function userPromptScreenshot(){
    //add screenshot 

    //save it to downloads
  }
  function userPromptRecord(){
    // record 

    // save
  }
};

export default Page;