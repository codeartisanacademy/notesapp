import React from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import { firestoreDb } from '../firbase-config';
import { collection, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; 

const Home = () => {
    const [myNotes, setMyNotes] = useState([]);
    const notesCollectionRef = collection(firestoreDb, "notes");
    const [modalDetailVisible, setModalDetailVisible] = useState(false);
    const [modalAddNotesVisible, setModalAddNotesVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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

    const handleDetailPress = (item)=>{
        setModalDetailVisible(true);
        setSelected(item);
        
    }

    const openModalAddNotes = ()=>{
        setModalAddNotesVisible(true);
    }

    const handleSubmit = async ()=>{
    }

    useEffect(() => {
        getNotes();
    }, []);

    

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'end', marginBottom:20}}>
                    <TouchableOpacity onPress={openModalAddNotes}><Ionicons name="add-circle-outline" size={24} color="black" /></TouchableOpacity>
                </View>
                <Text style={{fontWeight:"bold", marginBottom:10}}>All Notes</Text>
                <FlatList
                    data={myNotes}
                    renderItem={({item})=>{
                        return(
                            <View style={{paddingVertical:8}}>
                                <TouchableOpacity onPress={()=>(handleDetailPress(item))}><Text>{item.title}</Text></TouchableOpacity>
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
                    <TouchableOpacity onPress={()=>setModalDetailVisible(false)}><Ionicons name="close-circle-outline" size={24} color="black" /></TouchableOpacity>
                    
                </View>
                <View style={{padding:20, marginVertical:20}}>
                    <Text style={{fontSize:30, fontWeight:"bold"}}>{selected?.title}</Text>
                    <View style={{marginVertical:20}}>
                        <Text style={{fontSize:20}}>{selected?.content}</Text>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalAddNotesVisible}
                onRequestClose={() => {
                    setModalAddNotesVisible(!modalAddNotesVisible);
                }}
            >
                <View style={{flexDirection:'row', justifyContent:"end", padding:20}}>
                    <TouchableOpacity onPress={()=>setModalAddNotesVisible(false)}><Ionicons name="close-circle-outline" size={24} color="black" /></TouchableOpacity>
                </View>
                <View style={{padding:20, marginVertical:20}}>
                    <Text style={{fontSize:30, fontWeight:"bold"}}>Add New Notes</Text>
                    <View style={{marginVertical:20}}>
                        <Text>Title</Text>
                        <TextInput onChangeText={(value)=>setTitle(value)} style={{borderColor:"#cecece", borderWidth:1, padding:10, marginTop:8, marginBottom:20}} />
                        <Text>Content</Text>
                        <TextInput multiline={true} placeholder="enter the content" style={{height:100,borderColor:"#cecece", borderWidth:1, padding:10, marginTop:8, marginBottom:20   }} onChangeText={(value)=>setContent(value)} />

                        <TouchableOpacity style={{padding:10, backgroundColor:'#000', borderRadius:10}} onPress={handleSubmit} >
                            <Text style={{color:'#ffffff', alignSelf:"center"}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
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
