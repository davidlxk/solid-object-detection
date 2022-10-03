import { Component, createSignal } from 'solid-js';
import styles from './InfoDisplay.module.css';

interface InfoDisplayProps {

    
}

const InfoDisplay: Component<InfoDisplayProps> = (props:InfoDisplayProps) => {

    return(<div class={styles.infoContainer}>
        <div class={styles.infoTitle}>Object Detection with CocoSD</div>
        <div class={styles.infoDesc}>Powered by Tensorflow, SolidJS plus some fun and joy</div>
        <div class={styles.packagesContainer}>
            <div class={styles.packagePill}>@tensorflow/tfjs</div>
            <div class={styles.packagePill}>@tensorflow/tfjs-core</div>
            <div class={styles.packagePill}>solid-js</div>
            <div class={styles.packagePill}>@tensorflow-models/coco-ssd</div>
        </div>
        
    </div>);

};

export default InfoDisplay;