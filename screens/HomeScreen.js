// Screen that displays images 

// Module imports

import React, { useEffect, useState } from 'react';
import {SafeAreaView , Image , Alert , StyleSheet , FlatList , ActivityIndicator , Modal, TouchableOpacity, Dimensions} from 'react-native';
import ImageDownload from '../components/ImageDownload';
import { parseString } from 'xml2js';

// Getting Dimensions for the screen

const { width , height } = Dimensions.get('window');

// Main Homscreen App

const HomeScreen = ({ route }) => {

    // Various booru urls

    var safeurl  = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags='; // Safebooru.org url

    var nsfwurl = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags='; // Rule34.org url

    // Various constants

    const [isloading , setLoading] = useState(true); // Loader before rendering the images

    const [images , setImages] = useState([]); // The images itself

    const [selectedImage , setSelectedImage] = useState(null); // The selected image which will get fullscreen and can be downloaded by the user

    const { tags , limit , value} = route.params; // Getting the values of the Tags , Limit , Value of the url

    // Checking what type of content the user wants

    if (value === "safeurl"){

        selectedeurl = safeurl

    } else {

        selectedeurl = nsfwurl

    }
    
    // Function that parse's XML data from the booru url to JSON Data to display the images

    function parseResponseData(responseData) {

        let images = [];

        // parseString function will get the XML data from the server and pushes it into the images array

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
                    preview_url: post.$.preview_url,
                };

                images.push(image);

            }

        });

        return images;

    }

    // This is used to render images to the FlatList Component

    // Old Way of rendering Images 
    
    const renderImage = ({ item }) => {

        // Old way of rendering images = <Image source={{ uri: item.file_url }} style={styles.image}/>

        // It returns the images.preview_url which is basically a low quality version of the image from the images array

        // It then wrap them around as an TouchableOpacity to make it so that the user can press on the image which will set the setSelectedImage from null to item.file_url

        return (

            <TouchableOpacity onPress={() => {
                
                    setSelectedImage(item.file_url)
                
                }} key={item.file_url}>

                <Image source={{ uri: item.preview_url }} style={styles.image}/>

            </TouchableOpacity>
            
        )


    };

    // This is used to get the images from the desired booru using the Fetch API

    const getImages = async () => {


        try {

            {

                // Concatenating the selected url and the tags with the limit

                const url = selectedeurl + tags + '&limit=' + limit;

                // Using the fetch API to get the response

                const response = await fetch(url);

                // Converting that response to a text and storing it in the responseData constant

                const responseData = await response.text();

                // Checking to see if there includes any post data in the reponseData

                if (responseData.includes("post")) {

                    // Sending the responseData to parseResponseData function which is then stored it images constant

                    const images = parseResponseData(responseData);

                    // Calling the setImages state and giving it the images array

                    setImages(images);

                } else {

                    // A simple error called if something fails 

                    // Need to change to an Alert (to lazy to do that)

                    console.error("Unexpected response format: " , responseData);

                }

            } 


            // Catching any errors
        } catch (error){
            
            console.error(error);

            // After fetching the images stop the loading

        } finally{

            setLoading(false);

        }

    };

    // Calling the useEffect to call the getImages function and telling it to change when their is any change in the tags and limit

    useEffect(() => {

        getImages();

    }, [tags , limit])

    // render the different components

    return (

        // Have a SafeAreaView component 

        <SafeAreaView style={styles.container}>

            {isloading ? (

                <ActivityIndicator/> // Checking if the isloading is true then show the AcivityIndicator which basically renders a basic loading animation 

            ) : (

                // And if isloading is set to false then render the images in as a FlatList component

                <FlatList 
                
                contentContainerStyle={styles.imagesContainer}
                
                data={images}

                renderItem={renderImage}

                numColumns={2}

                />


            )}

            <Modal
            
            /* This is a Modal Component which has a ToucableOpacity component which then has a ImageDownlaod component and an Image component 
            
                This Modal is not visible if the setSelectedImage is set to null but it is visible when the selectedImage is not equal to null 

                which means when a user presses on a image it becomes visible and the download button as well
            
            */
            
            // The props for the Modal
            animationType='fade'
            transparent={true}
            visible={selectedImage !== null}
            onRequestClose={() => setSelectedImage(null)}

            >

                <TouchableOpacity style={styles.modalContainer} onPress={() => setSelectedImage(null)}>

                    <ImageDownload imageUri={selectedImage}/>

                    <Image source={{ uri: fullscreenImage}} style={styles.imagefullscreen} resizeMode='contain'/>

                </TouchableOpacity>

            </Modal>         

        </SafeAreaView>
        
    )

};  

// Certain styles

const styles = StyleSheet.create({

    // The main container

    container: {

        flex: 1,

    },

    // The low render image container 

    imagesContainer: {
        
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    
    },

    // Row container

    row:{

        flex: 1,
        justifyContent: 'center'

    },

    // The low render image size

    image: {

        width: 200,

        height: 200,

    },

    // The size of the image when it's fullscreen

    imagefullscreen: {

        width: width,

        height: height,

        flex: 1,

    },

    // The modal container

    modalContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)',

    },

})

// Exporting the Homescreen component

export default HomeScreen;