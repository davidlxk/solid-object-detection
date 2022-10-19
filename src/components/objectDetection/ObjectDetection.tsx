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

    let video: any = <video id='camera' autoplay={true} width={props.width} height={props.height}></video>;
    // let canvas = <canvas id="canvas" style={{"background-color": "transparent"}} width={props.width} height={props.height}></canvas>
    
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
            
            setTimeout(() => predictionFunction(), 200);
            // predictionFunction();
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
        const cnvs: any = document.getElementById("canvas");
        const ctx:any = cnvs.getContext("2d");
        // ctx?.drawImage(video,0,0,props.width,props.height);
        ctx.clearRect(0,0, props.width,props.height);
        
        //Start predictions
        const predictions = await model().detect(document.getElementById("camera"));//await model().detect(cnvs);
        if (predictions.length > 0) {
    
            // const top:Prediction = predictions[0];

            for (let n = 0; n < predictions.length; n++) {

                // console.log(n);
          
                // if (predictions[n].score > 0.5) {
          
                  //Threshold is 0.8 or 80%
                  //Extracting the coordinate and the bounding box information
                  let bboxLeft = predictions[n].bbox[0];
                  let bboxTop = predictions[n].bbox[1];
                  let bboxWidth = predictions[n].bbox[2];
                  let bboxHeight = predictions[n].bbox[3] - bboxTop;
                //   console.log("predictions[n] is ",predictions[n]);
                //   console.log("bboxLeft: " + bboxLeft);
                //   console.log("bboxTop: " + bboxTop);
                //   console.log("bboxWidth: " + bboxWidth);
                //   console.log("bboxHeight: " + bboxHeight);
                  //Drawing begin
                  ctx.beginPath();
                  ctx.font = "28px Arial";
                  ctx.fillStyle = "red";
                  ctx.fillText(
                  predictions[n].class +": " + Math.round(parseFloat(predictions[n].score) * 100) +
                  "%", bboxLeft,bboxTop);
                  ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
                  ctx.strokeStyle = "#FF0000";
                  ctx.lineWidth = 3;
                  ctx.stroke();
                //   console.log("detected");
                // }
            }
            


            // setTimeout(() => {
            //     props.setIfReading(false);
            //     props.setDisplayName(top.class);
            //     // setStore({objectName:top.class,ifReading:false});
            // }, 500);
            
        } else {

            // setTimeout(() => {
            //     props.setIfReading(false);
            //     props.setDisplayName("Hmmm...");
            // }, 500);
        }

        //Rerun prediction by timeout
        // ctx?.clearRect(0,0, props.width,props.height);
        // predictionFunction();
        setTimeout(() => predictionFunction(), 250);
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
        {/* {video} */}
        <div class={styles.video}>{video}</div>
        {/* <div class={styles.canvasContainer}>
            <canvas id="canvas" width={props.width} height={props.height}></canvas>
        </div> */}
        <div style={{ position: 'absolute', top: "100px", "z-index": "9999" }}>
            <canvas
                id="canvas"
                width={props.width}
                height={props.height}
            style={{ "background-color": "transparent" }}
            />
        </div>
        {/* <img id="img" src="" style={{display:"none"}} /> */}
    </div>);

};

export default ObjectDetection;