"use client"
import React, { use, useEffect, useRef,useState } from 'react'
import Webcam from 'react-webcam';
import './customstyle.css';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/theme-toggle';
import { Camera, CameraIcon, PersonStanding, VideoIcon, Volume2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { Puff, Rings} from 'react-loader-spinner';
import { Slider } from '@/components/ui/slider';
import * as cocossd from '@tensorflow-models/coco-ssd'
import "@tensorflow/tfjs-backend-cpu"
import "@tensorflow/tfjs-backend-webgl"
import { DetectedObject, ObjectDetection } from '@tensorflow-models/coco-ssd';
import StaticGenerationSearchParamsBailoutProvider from 'next/dist/client/components/static-generation-searchparams-bailout-provider';
import { drawOnCanvas } from '@/utils/draw';

type Props = {}

let interval :any =null;
const Page = (Props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const  [volume,setvolume]= useState(0);
  const [model,setModel]=useState<ObjectDetection>();
  const [loading, setLoading] = useState(false);
  
  
  
  useEffect(() => {
    setLoading(true);
    initModel();
    }, [model])
    
  async function initModel() {
      const loadedModel: ObjectDetection = await cocossd.load({
        base: 'lite_mobilenet_v2'
      });   
      setModel(loadedModel);
  };
      
  useEffect(() => {
      if(model){
        setLoading(false);
      }
    
  }, [model])

  useEffect(() => {
    interval = setInterval(() => {
      runPrediction();
    },100)
    return () => {
      clearInterval(interval);
    }
  },[webcamRef.current,model])

  async function runPrediction(){
    if(webcamRef.current && model && webcamRef.current.video && webcamRef.current.video.readyState === 4){
      const predictions: DetectedObject[]= await model.detect(webcamRef.current.video)
      resizeCanvas(canvasRef,webcamRef);  
      drawOnCanvas(predictions,canvasRef.current?.getContext('2d'));
    
    }
  
  }

  return (
    <body>
      {/* <div className='flex h-screen w-screen'> */}
        <div className='header'>
        <div className="headerLeft">SURVELLIENCE FOOTAGE OPTIMIZATION</div>
          <div className='headerRight'><ModeToggle></ModeToggle></div>     
        </div>

        
          <div className='cambox'>
            <Webcam ref={webcamRef} mirrored className='webcamclass' />
            <canvas ref={canvasRef}
            className='canvasclass'></canvas>
          </div>

          

          <Separator className='separator'/>
          

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='ButtonParent'>

              <Button variant={'outline'} className='box' onClick={userPromptScreenshot} style={{ display: 'flex', alignItems: 'center' }}>
                <CameraIcon style={{ marginRight: '5px' }} />
                Capture
              </Button>


              <Button variant={isRecording ? 'destructive' : 'outline'} className='box' onClick={userPromptRecord} style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <VideoIcon style={{ marginRight: '5px' }} />
                manual Record
              </Button>

              <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px' }} className='box'variant={autoRecordEnabled ? 'destructive' : 'outline'}
                size={'icon'}
                onClick={toggleAutoRecord}>
                  Automate
              {autoRecordEnabled?<Puff color="red" height={33}></Puff>:<PersonStanding/>}
              </Button>

              <div className="soundslider">
              {/* <div className="icon"><Volume2Icon/></div>
              <div className="slider"><Slider max={1} min={0} step={0.1}></Slider></div> */}
              </div>
            </div>  

          <Separator className='2px white'/>
          {/* <div className="flex-container">
            <div className="flex-item"></div>
            <div className="flex-item"></div>
            <div className="flex-item"></div>
          </div>
         */}
        {/* <Separator className='separator'/>'
          <div>
            
          </div> */}

        {loading && <div className='z-50 absolute w-full h-full flex items-center justify-center bg-primary-foreground'>
          Getting things ready . . . <Rings height={50} color='red' /> 
        </div>}  
      {/* </div>   */}
    </body>
    
    
  );
  function userPromptScreenshot(){
    //add screenshot 

    //save it to downloads
  }
  function userPromptRecord(){
    // check if recording 
        //then stop recording
        //save it to downloads

    // if not recording
      //start recording
  }
  function toggleAutoRecord(){
    if(autoRecordEnabled){
      setAutoRecordEnabled(false);
      toast("AutoRecord Disabled")

    }
    else{
      setAutoRecordEnabled(true);
      toast("AutoRecord Enabled")

    }
  }
};

export default Page;

function resizeCanvas(canvasRef: React.RefObject<HTMLCanvasElement>, webcamRef: React.RefObject<Webcam>) {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;
  if (video && canvas) {
    const { videoWidth, videoHeight } = video;
    canvas.width=videoWidth;
    canvas.height=videoHeight;
  }
}

