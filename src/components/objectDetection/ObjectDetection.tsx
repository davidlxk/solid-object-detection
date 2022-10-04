import { Component, createSignal, onMount } from 'solid-js';
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs-core";
import '@tensorflow/tfjs-backend-cpu';
import Store from '../../store/Store';
import styles from './ObjectDetection.module.css';

interface ObjectDetectionProps {

    width:number;
    height:number;
}

interface Prediction {
    bbox: string[];
    class: string;
    score: number;
}

const ObjectDetection: Component<ObjectDetectionProps> = (props:ObjectDetectionProps) => {

    let video = <video id='camera' width={props.width} height={props.height} autoplay={true}>
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

        setStore({objectName:"",ifReading:true});

        //Clear the canvas for each prediction
        const cnvs = document.getElementById("canvas");
        const ctx = cnvs.getContext("2d");
        ctx.drawImage(video,0,0,props.width,props.height);
        // ctx.clearRect(0,0, props.width,props.height);
        
        //Start prediction
        const predictions = await model().detect(cnvs);
        if (predictions.length > 0) {
    
            const top:Prediction = predictions[0];

            setTimeout(() => {
                setStore({objectName:top.class,ifReading:false});
            }, 500);
            
        }
        //Rerun prediction by timeout
        ctx.clearRect(0,0, props.width,props.height);
        setTimeout(() => predictionFunction(), 1500);
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
        <div class={styles.video}>{video}</div>
        {canvas}
        <img id="img" src="" style={{display:"none"}} />
    </div>);

};

export default ObjectDetection;