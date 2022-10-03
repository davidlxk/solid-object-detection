import { createStore } from 'solid-js/store';

interface StoreProps {

    objectName: string;
    ifReading: boolean;
}

const Store = createStore<StoreProps>({
    objectName: "",
    ifReading: false,
});

export default Store;