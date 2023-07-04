// Screen that displays images 

// Module imports

import React, { useEffect, useState } from 'react';
import {SafeAreaView  , Image , StyleSheet , FlatList , ActivityIndicator , Modal, TouchableOpacity, Dimensions} from 'react-native';
import ImageDownload from '../components/ImageDownload';
import { parseString } from 'xml2js';

// Getting Dimensions for the screen

const { width , height } = Dimensions.get('screen');

// Main Homscreen App

const HomeScreen = ({ route }) => {

    // Various booru urls

    var safeurl  = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=';

    var nsfwurl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=';

    // Various constants

    const [isloading , setLoading] = useState(true);

    const [images , setImages] = useState([]);

    const [selectedImage , setSelectedImage] = useState(null);

    const { tags , limit , value} = route.params;

    // Checking what type of content the user wants

    if (value == "safeurl"){

        selectedeurl = safeurl

    } else if (value == "nsfwurl"){

        selectedeurl = nsfwurl

    }
    
    // Function that parse's XML data from the booru url to JSON Data to display the images

    function parseResponseData(responseData) {

        let images = [];

        parseString(responseData, (err, result) => {

            if (err) {

                console.error("Error parsing XML: ", err);
                return;

            }

            const posts = result.posts.post;
            for (const post of posts) {

                const image = {
                    file_url: post.$.file_url,
                    tags: post.$.tags,
                };

                images.push(image);

            }

        });

        return images;

    }

    // This is used to render images to the FlatList Component

    const renderImage = ({ item }) => {

        // Old way of rendering images = <Image source={{ uri: item.file_url }} style={styles.image}/>

        return (

            <TouchableOpacity onPress={() => setSelectedImage(item.file_url)} key={item.file_url}>

                <Image source={{ uri: item.file_url }} style={styles.image}/>

            </TouchableOpacity>
            
        )


    };

    // This is used to get the images from the desired booru using the Fetch API

    const getImages = async () => {

        
        try {

            {

                const url = selectedeurl + tags + '&limit=' + limit;

                const response = await fetch(url);

                const responseData = await response.text();

                if (responseData.includes("post")) {

                    const images = parseResponseData(responseData);
                    setImages(images);

                } else {

                    console.error("Unexpected response format: " , responseData);

                }

            } 

        } catch (error){
            
            console.error(error);

        } finally{

            setLoading(false);

        }

    };

    useEffect(() => {

        getImages();

    }, [tags , limit])

    // render the different components

    return (

        <SafeAreaView style={styles.container}>

            {isloading ? (

                <ActivityIndicator/>

            ) : (

                <FlatList 
                
                contentContainerStyle={styles.imagesContainer}
                
                data={images}

                renderItem={renderImage}

                numColumns={2}

                />

            )}

            <Modal

            animationType='fade'
            transparent={true}
            visible={selectedImage !== null}
            onRequestClose={() => setSelectedImage(null)}

            >

                <TouchableOpacity style={styles.modalContainer} onPress={() => setSelectedImage(null)}>

                    <ImageDownload imageUri={selectedImage}/>

                    <Image source={{ uri: selectedImage }} style={styles.imagefullscreen} resizeMode='contain'/>

                </TouchableOpacity>

            </Modal>         

        </SafeAreaView>
        
    )

};  

// Certain styles

const styles = StyleSheet.create({

    container: {

        flex: 1,

    },

    imagesContainer: {
        
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    
    },

    row:{

        flex: 1,
        justifyContent: 'center'

    },

    image: {

        width: 200,

        height: 200,

    },

    imagefullscreen: {

        width: width,

        height: height,

        flex: 1,

    },

    modalContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)',

    },

})

export default HomeScreen;