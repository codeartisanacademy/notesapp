import React from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { useState, useEffect } from 'react';
import { firestoreDb } from '../firbase-config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const Home = () => {
    const [myNotes, setMyNotes] = useState([]);
    const notesCollectionRef = collection(firestoreDb, "notes");
    const [modalDetailVisible, setModalDetailVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    const getNotes = async () => {
        const data = await getDocs(notesCollectionRef);
        //console.log(data.docs);
        let notes = []
        data.forEach(doc=>{
            //console.log(doc.id, ':', doc.data());   
            notes.push({id:doc.id, ...doc.data()}) // [{id:'', title:'', content:'', likes:x}, {id:'', title:'', content:'', likes:x}]
        })
        console.log(notes);
        setMyNotes(notes);
    }

    const handleDetailPress = ()=>{
        setModalDetailVisible(true);
        
    }

    useEffect(() => {
        getNotes();
    }, []);

    

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'end', marginBottom:20}}>
                    <TouchableOpacity style={{backgroundColor:'#fff', padding:10, borderRadius:8}}><Text>+</Text></TouchableOpacity>
                </View>
                <Text style={{fontWeight:"bold", marginBottom:10}}>All Notes</Text>
                <FlatList
                    data={myNotes}
                    renderItem={({item})=>{
                        return(
                            <View style={{paddingVertical:8}}>
                                <TouchableOpacity onPress={handleDetailPress}><Text>{item.title}</Text></TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={item=>item.id}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalDetailVisible}
                onRequestClose={() => {
                    setModalDetailVisible(!modalDetailVisible);
                }}
            >
                <View style={{flexDirection:'row', justifyContent:"end", padding:20}}>
                    <TouchableOpacity onPress={()=>setModalDetailVisible(false)}><Text>Close</Text></TouchableOpacity>
                </View>
                
            </Modal>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:20,
    },
    addContainer:{
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'end'
    }
})

export default Home
