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
      
        const downloadResumable = FileSystem.createDownloadResumable(
        
            imageUri,
        
            FileSystem.documentDirectory + 'image.jpg'
      
      );

      const { uri } = await downloadResumable.downloadAsync();

      if (uri) {
        
        const asset = await MediaLibrary.createAssetAsync(uri);

        await MediaLibrary.createAlbumAsync('Ishitori' , asset, false);

        Alert.alert('Download Complete', 'Image saved to gallery.');
      
    }
    
    } catch (error) {
      
        Alert.alert('Error', `Error while downloading image: ${error}`);
    
    }
  
};

  // render the different components

  return (
    
    <View style={styles.container}>
      
      <TouchableOpacity onPress={handleDownload}>
      
        <AntDesign name="download" size={24} color="white" />
      
      </TouchableOpacity>
    
    </View>
  
  );

};

// Various different styles

const styles = StyleSheet.create({
  
    container: {
    
        flex: 0.1,
    
        position: 'relative',
    
        left: 160,
   
        top: 20,
 
    },

});

export default ImageDownload;
