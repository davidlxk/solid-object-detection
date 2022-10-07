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
    const [ifReading, setIfReading] = createSignal<boolean>(false);
    const [displayName, setDisplayName] = createSignal<string>("");

    return(<div class={styles.parentContainer}>
        <div class={styles.header}></div>
        {/* <div class={styles.mainContainer}>
            <div class={styles.animationContainer}></div>
            
        </div> */}
        <ObjectDetection width={window.innerWidth} height={600} setIfReading={setIfReading} setDisplayName={setDisplayName}/>
        <ObjectDisplay ifReading={ifReading()} displayName={displayName()}/>
        {/* <InfoDisplay /> */}
    </div>);

};

export default HomeScreen;