// This was written by CHATGPT so I don't know much but I will still try to explain what's going on

// This is the Image Download Button 

// Module imports

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

// Main function for the Image Download

const ImageDownload = ({ imageUri }) => {

  // Function that handles the download

  const handleDownload = async () => {

    try {

        // createing a download that takes in the imageUri being passed and the file system directory

        const downloadResumable = FileSystem.createDownloadResumable(
        
            imageUri,
        
            FileSystem.documentDirectory + 'image.jpg'
      
      );

      // Getting the uri

      const { uri } = await downloadResumable.downloadAsync();

      // Checking for the uri    

      if (uri) {
        
        // Creating a asset with that uri which means here creating the image

        const asset = await MediaLibrary.createAssetAsync(uri);

        // Then it creates a new Album called Ishitori where it stores all of the downloaded photos

        await MediaLibrary.createAlbumAsync('Ishitori' , asset, false);

        // This Alert doesn't work I am trying to fix it

        Alert.alert('Download Complete', 'Image saved to gallery.');
      
    }
    
    // catching the error which also doesn't display (Very good program by CHATGPT :))

    } catch (error) {
      
        Alert.alert('Error', `Error while downloading image: ${error}`);
    
    }
  
};

  // render the different components

  return (
    
    // It returns a View Component which as a TouchableOpacity Component which has the Icon

    // When pressed calls the handleDownload function above

    <View style={styles.container}> 
      
      <TouchableOpacity onPress={handleDownload}>
      
        <AntDesign name="download" size={24} color="white" />
      
      </TouchableOpacity>
    
    </View>
  
  );

};

// Various different styles

const styles = StyleSheet.create({
  
    // The container style because it was not working becuase of the Modal

    container: {
    
        flex: 0.1,
    
        position: 'relative',
    
        left: 160,
   
        top: 20,
 
    },

});

// Exporting the ImageDownload component

export default ImageDownload;