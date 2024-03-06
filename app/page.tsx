import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './customstyle.css';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/theme-toggle';
import Button from '@material-ui/core/Button';
import { Camera, CameraIcon, VideoIcon } from 'lucide-react';

type Props = {};

const Page = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State
  const [isRecording, setIsRecording] = useState<boolean>(false);

  return (
    <body>
      <button></button>
      <div className='header'>
        Header content goes here
      </div>
      <div className='cambox'>
        <Webcam ref={webcamRef} mirrored className='webcamclass' />
        <canvas ref={canvasRef} className='canvasclass'></canvas>
      </div>
      <Separator className='separator' />
      <ModeToggle />
      <div className='container'>
        <Button variant="contained" color="primary" className='box' onClick={userPromptScreenshot}>
          <CameraIcon />Capture
        </Button>
        <Button variant={isRecording ? 'destructive' : 'outlined'} color="primary" className='box' onClick={userPromptRecord}>
  <VideoIcon />Auto Record
</Button>

        <Button variant="contained" color="primary" className='box' onClick={handleManualRecord}>
          <VideoIcon />Manual Record
        </Button>
      </div>
      <Separator className='separator' />
      <div className='footer'>
        Footer content goes here
      </div>
    </body>
  );

  function userPromptScreenshot() {
    //add screenshot 
    //save it to downloads
  }

  function userPromptRecord() {
    // record 
    // save
  }

  function handleManualRecord() {
    // handle manual record
  }
};

export default Page;
