import React from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { useState, useEffect } from 'react';
//import { db } from '../firbase-config';
//import {collection, getDocs} from 'firebase/firestore';

const Home = () => {
    const [myNotes, setMyNotes] = useState([])
    //const myNotesRef = collection(db, 'mynotes');

    const notes = [
        {
            'id':'1',
            'title':'My thoughts',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum mattis massa, in vehicula arcu molestie a. Morbi ligula felis, ullamcorper sed convallis nec, tincidunt vestibulum justo. Aliquam a porta mi. Praesent rutrum elit et rutrum molestie. Mauris accumsan congue urna mattis efficitur.',
            'date':'2022-01-29',
            'photos':[]
        },
        {
            'id':'2',
            'title':'Ideas for Blockchain App',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum mattis massa, in vehicula arcu molestie a. Morbi ligula felis, ullamcorper sed convallis nec, tincidunt vestibulum justo. Aliquam a porta mi. Praesent rutrum elit et rutrum molestie. Mauris accumsan congue urna mattis efficitur.',
            'date':'2022-01-27',
            'photos':[]
        },
        {
            'id':'3',
            'title':'Travel plan',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum mattis massa, in vehicula arcu molestie a. Morbi ligula felis, ullamcorper sed convallis nec, tincidunt vestibulum justo. Aliquam a porta mi. Praesent rutrum elit et rutrum molestie. Mauris accumsan congue urna mattis efficitur.',
            'date':'2022-01-27',
            'photos':[]
        },
    ]

    return (
        <SafeAreaView>
            <Text>All Notes</Text>
            <FlatList
                data={notes}
                renderItem={({item})=>{
                    return(
                        <View>
                            <Text>{item.title}</Text>
                        </View>
                    )
                }}
                keyExtractor={item=>item.id}
            />
        </SafeAreaView>
    )
}

export default Home
