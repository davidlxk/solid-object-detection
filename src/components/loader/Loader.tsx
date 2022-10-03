import { Component } from "solid-js";
import { Motion } from "@motionone/solid";
import styles from './Loader.module.css';

const Loader: Component = () => (<div class={styles.loaderContainer}>
    <Motion.div class={styles.loader}
        animate={{ rotate: 90 }}
        transition={{ duration: 0.75, easing: "ease-in-out", repeat: Infinity }}
    />
  </div>
);
  
export default Loader;