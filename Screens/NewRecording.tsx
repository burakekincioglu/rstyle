import OpenAI from 'openai';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStackScreenProps } from '../AppNavigator';
import { apiKeys } from '../api/keys';

interface NewRecordingProps extends AppStackScreenProps<'NewRecording'> {}

const NewRecording = (props: NewRecordingProps) => {
    const uri = props.route.params.uri

    useEffect(() => {    
      handleTranscribe()
    }, [uri])
    
    const openai = new OpenAI({
        apiKey: apiKeys.OPENAI_KEY
    });
    const handleTranscribe = async () => {
        try {
            console.log("xx", uri);
            
            const formData = new FormData()
            const audioData = {uri: uri, name: 'audio.m4a', type: 'audio/m4a'}
            formData.append('file', audioData)
            const response = await openai.audio.transcriptions.create({
                file: formData,
                model: "whisper-1",
                response_format: "text",
              });
            console.log("json geldi mi:", response);
            
          } catch (error) {
            console.log(error);
            
          }
        }

  return (
    <View>
      <Text>NewRecording</Text>
    </View>
  )
}

export default NewRecording

const styles = StyleSheet.create({})