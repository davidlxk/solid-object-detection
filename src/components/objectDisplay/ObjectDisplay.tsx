import { Component, createEffect, createResource, Show, For, createSignal } from 'solid-js';
import Store from '../../store/Store';
import Loader from '../loader/Loader';
import styles from './ObjectDisplay.module.css';

interface DisplayObjectProps {

    ifReading:boolean;
    displayName:string;
}

const ObjectDisplay: Component<DisplayObjectProps> = (props:DisplayObjectProps) => {

    // const [store, setStore] = Store;
    // const [displayName, setDisplayName] = createSignal<string>("");
    // const [desc, setDesc] = createSignal<string>("");


    // createEffect(() => {
    
    //     const objectName = store.objectName;
    //     const uppercased: string = objectName.charAt(0).toUpperCase() + objectName.slice(1);
    //     setDisplayName(uppercased);
    // });


    // createEffect(() => {
    
    //     if (store.ifReading) {
    //         setDesc("Give me a second here...");
    //     } else {
    //         setDesc("Pretty sure that's correct");
    //     }
    
    // });

    return(<div class={styles.footer}>
        <Show when={!props.ifReading}>
            <div class={styles.displayName}>{props.displayName}</div>
        </Show>
        <Show when={props.ifReading}>
            <Loader />
        </Show>
    </div>);

};

export default ObjectDisplay;