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
    const [tags , setTags] = useState('rem_(re:zero)');
    const [limit , setLimit] = useState('100');
    const [open , setOpen] = useState(false);
    const [value , setValue] = useState(null);
    const [items , setItems] = useState([

        {label: "SFW" , value: "safeurl"},
        {label: "NSFW" , value: "nsfwurl"}

    ]);

    const [suggestions , setSuggestions] = useState([]);
    
    const fetchTagSuggestions = async () => {

        try {

            const response = await axios.get('https://safebooru.org/index.php?page=tags&s=list');

            // console.log(response)

            const html = response.data;

            // console.log(html)

            const $ = cheerio.load(html);

            const tags = [];

            $('body > table.highlightable > tbody > tr > td > a').each(

                (index, element) => {

                    //console.log(element);
                    tags.push($(element).text());

                }

            );

            //console.log(tags);

            setSuggestions(tags);

        } catch ( error ) {

            console.error("Error fetching tags: " , error);

        }

    }

    useEffect(() => {

        fetchTagSuggestions();

    }, [])


    // Check Sus function because why not lol

    const checkSus = ({ tags , value }) => {

        if (tags == "loli" || value == "loliurl"){

            Alert.alert("Ohh my days!!");

        }

    }

    const handleInputChange = (text) => {

        setTags(text);

    }

    const handleTagsSelect = (tag) => {

        setTags(tag);

    }

    const renderTagSelection = () => {
        return suggestions.map((tag) => (
          <TouchableOpacity
            style={styles.tagButton}
            key={tag}
            onPress={() => handleTagsSelect(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ));
    };
    // Render the differnet components again

    return (
        
        <View style={styles.homepagecontainer}>

            <View style={styles.tagSuggestionsContainer}>{renderTagSelection()}</View>

            <TextInput
                style={styles.text}
                placeholder='Search Tags'
                value={tags}
                // onChangeText={setTags}
                onChangeText={handleInputChange}
            />

            <TextInput
                style={styles.text}
                placeholder='Search Limit'
                value={limit}
                onChangeText={setLimit}
            />

            <Button
                onPress={() => {

                    checkSus({ tags })

                    navigation.navigate('Home' , { tags , limit , value})

                    // console.log(tags, limit , value)

                }}
                title='Search'
                color="#000000"
            />

            <DropDownPicker 

                style={styles.dropdowncontainer}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}

            />

            {suggestions.map((tag) => (
                    
                    <Button
                    
                        key={tag}
                        
                        title={tag}
                        
                        onPress={() => handleTagsSelect(tag)}
                        
                        color="#000000"
                    

                    />
            ))}

        </View>

    );

};

// Various styles

const styles = StyleSheet.create({

    homepagecontainer: {

        flex: 1,

        alignItems: 'center',

        justifyContent: 'flex-start',

        marginTop: 10,

    },

    text: {

        fontSize: 30,
        
    },

    dropdowncontainer: {

        marginTop: 10,

    },

    tagSuggestionsContainer: {
        
        flexDirection: 'row',
        
        flexWrap: 'wrap',
        
        marginTop: 10
    
    },
    
    tagButton: {
        
        backgroundColor: '#eaeaea',
        
        borderRadius: 10,
        
        paddingHorizontal: 10,
        
        paddingVertical: 5,
        
        margin: 5
    
    },
    
    tagText: {
        
        fontSize: 16
      
    }


});

export default SideBar;