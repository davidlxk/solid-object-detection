import { Component, createSignal, JSXElement, onMount } from 'solid-js';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs-core";
import '@tensorflow/tfjs-backend-cpu';
import Store from '../../store/Store';
import styles from './ObjectDetection.module.css';

interface ObjectDetectionProps {

    width:number;
    height:number;
    setIfReading:(ifReading: boolean) => void;
    setDisplayName: (displayName: string) => void;
}

interface Prediction {
    bbox: string[];
    class: string;
    score: number;
}

const ObjectDetection: Component<ObjectDetectionProps> = (props:ObjectDetectionProps) => {

    let video:JSXElement = <video id='camera' autoplay={true} width={props.width}>
    </video>;
    let canvas = <canvas id="canvas" style={{display:'none'}} width={props.width} height={props.height}></canvas>
    
    const [model, setModel] = createSignal<any>();

    const [store, setStore] = Store;

    onMount(()=>{
        getMedia();
        loadModel();
    });

    async function loadModel() {
        try {
            const model = await cocoSsd.load();
            setModel(model);
            
            predictionFunction();
        } 
        catch (err) {
          console.log(err);
        }
    }

    async function predictionFunction() {

        props.setIfReading(true);
        props.setDisplayName("");
        // setStore({objectName:"",ifReading:true});

        //Clear the canvas for each prediction
        const cnvs:HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = cnvs.getContext("2d");
        ctx?.drawImage(video as CanvasImageSource,0,0,props.width,props.height);
        // ctx.clearRect(0,0, props.width,props.height);
        
        //Start prediction
        const predictions = await model().detect(cnvs);
        if (predictions.length > 0) {
    
            const top:Prediction = predictions[0];

            setTimeout(() => {
                props.setIfReading(false);
                props.setDisplayName(top.class);
                // setStore({objectName:top.class,ifReading:false});
            }, 500);
            
        } else {

            setTimeout(() => {
                props.setIfReading(false);
                props.setDisplayName("Hmmm...");
            }, 500);
        }

        //Rerun prediction by timeout
        ctx?.clearRect(0,0, props.width,props.height);
        // predictionFunction();
        setTimeout(() => predictionFunction(), 600);
      }

    async function getMedia() {
        let stream = null;
        
        try {

            stream = await navigator.mediaDevices.getUserMedia({ video: {
                facingMode: 'environment'
            }, audio: false});
            /* use the stream */
            video!.srcObject = stream;
            video!.play();

        } catch (err) {
            // console.log("ERR IS: ",err);
            /* handle the error */
        }
    }

    return(<div class={styles.cameraContainer}>
        {video}
        {/* <div class={styles.video}>{video}</div> */}
        {canvas}
        <img id="img" src="" style={{display:"none"}} />
    </div>);

};

export default ObjectDetection;