// The main Window

// Module imports

import React, { useEffect, useState } from 'react';
import { View , TextInput , StyleSheet , Button, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import cheerio from 'react-native-cheerio';

// Main function

const SideBar = ({ navigation }) => {

    // Serval variables like loli
    const [tags , setTags] = useState('rem_(re:zero)'); // The tags state
    const [limit , setLimit] = useState('100'); // the limit state
    const [open , setOpen] = useState(false); // the open Drawer state
    const [value , setValue] = useState(null); // the value Drawer state
    const [items , setItems] = useState([

        {label: "SFW" , value: "safeurl"},
        {label: "NSFW" , value: "nsfwurl"}

    ]); // The item's for the Drawer

    // Check Sus function because why not lol

    const checkSus = ({ tags , value }) => {

        if (tags == "loli" || value == "swimsuit" || value == "panties"){

            Alert.alert("Ohh my days!!");

        }

    }

    // Render the differnet components again

    return (
        
        // Rendering a View

        <View style={styles.homepagecontainer}>

            <TextInput // Text Input box for the tags input
                style={styles.text}
                placeholder='Search Tags'
                value={tags}
                onChangeText={setTags}
            />

            <TextInput // Text Input box for limit input
                style={styles.text}
                placeholder='Search Limit'
                value={limit}
                onChangeText={setLimit}
            />

            <Button // When pressing this button will call the checkSus function and then navigate you to the HomeScreen where the images will be fetched

                    // Later maybe going to remove this because the Search for tags and limit and the images will be in a single Screen
                onPress={() => {

                    checkSus({ tags })

                    navigation.navigate('Home' , { tags , limit , value})

                    // console.log(tags, limit , value)

                }}
                title='Search'
                color="#000000"
            />

            <DropDownPicker // DropDownPicker component for choosing what type of content you want

                style={styles.dropdowncontainer}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}

            />

        </View>

    );

};

// Various styles

const styles = StyleSheet.create({

    // Home Page container

    homepagecontainer: {

        flex: 1,

        alignItems: 'center',

        justifyContent: 'flex-start',

        marginTop: 10,

    },

    // The Text style

    text: {

        fontSize: 30,
        
    },

    // The drop down container

    dropdowncontainer: {

        marginTop: 10,

    },


});

// Exporting the SideBar component (It is not a SideBar I know that, I am just bad at making names)

export default SideBar;