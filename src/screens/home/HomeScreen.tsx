import { Component, createSignal } from 'solid-js';
import styles from './HomeScreen.module.css';
import Store from '../../store/Store';
import ObjectDetection from '../../components/objectDetection/ObjectDetection';
import ObjectDisplay from '../../components/objectDisplay/ObjectDisplay';
import InfoDisplay from '../../components/infoDisplay/InfoDisplay';

interface HomeScreenProps {

    
}

const HomeScreen: Component<HomeScreenProps> = (props:HomeScreenProps) => {

    const [store, setStore] = Store;

    return(<div class={styles.parentContainer}>
        <div class={store.ifReading ? styles.mainContainerReading : styles.mainContainer}>
            <div class={styles.animationContainer}></div>
            <ObjectDetection width={window.innerWidth} height={window.innerHeight}/>
        </div>
        <InfoDisplay />
        <ObjectDisplay />
    </div>);

};

export default HomeScreen;