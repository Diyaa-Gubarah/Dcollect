import firebase from '../../config/firebase';

export interface Item {
    id: string;
    name: string;
    description: string;
}

const fetchItems = async (): Promise<Item[]> => {
    const querySnapshot = await firebase.firestore().collection('items').get();
    return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Item;
    });
};

const addItem = async (data: Omit<Item, 'id'>) => {
    await firebase.firestore().collection('items').add({ data });
};

const updateItem = async (id: string, data: Omit<Item, 'id'>) => {
    const docRef = firebase.firestore().collection('items').doc(id);
    await docRef.update(data);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as Item;

};

const deleteItem = async (id: string) => {
    await firebase.firestore().collection('items').doc(id).delete();
};


export default { addItem, deleteItem, fetchItems, updateItem }