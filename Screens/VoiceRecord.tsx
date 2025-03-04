import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const VoiceRecord = () => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string>();
  const audioRecorderPlayer = new AudioRecorderPlayer();
  
  useEffect(() => {
    if (recording) {
      (async () => {
        console.log("Kayıt başlatılıyor...");
        await audioRecorderPlayer.startRecorder();
        
        audioRecorderPlayer.addRecordBackListener((e) => {
          console.log('Recording: ', e.currentPosition);
        });
      })();
    } else {
      (async () => {
        console.log("Kayıt durduruluyor...");
        audioRecorderPlayer.removeRecordBackListener(); // Önce temizle
        const result = await audioRecorderPlayer.stopRecorder();
        setRecordedUri(result);
      })();
    }

    return () => {
      console.log("Listener temizlendi");
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, [recording]);
  

  const onStartRecord = async () => {
    console.log("geldi mi");
    
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('Recording: ', e.currentPosition, recording);
    });
    console.log("start",result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecording(false);
    setRecordedUri(result);
    console.log("stop",result);
  };

  const onStartPlay = async () => {
    if (recordedUri) {
      const result = await audioRecorderPlayer.startPlayer(recordedUri);
      setPlaying(true);
      audioRecorderPlayer.addPlayBackListener((e) => {
        console.log('Playing: ', e.currentPosition);
        if (e.currentPosition === e.duration) {
          onStopPlay();
        }
      });
      console.log(result);
    }
  };

  const onStopPlay = async () => {
    const result = await audioRecorderPlayer.stopPlayer();
    setPlaying(false);
    audioRecorderPlayer.removePlayBackListener();
    console.log("stop",result);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title={'Stop Recording'}
        onPress={() => {setRecording(false)}}
      />
      <Button
        title={'Start Recording'}
        onPress={() => {setRecording(true)}}
      />
      {recordedUri && (
        <Button
          title={playing ? 'Stop Playing' : 'Start Playing'}
          onPress={playing ? onStopPlay : onStartPlay}
        />
      )}
      {recordedUri && <Text>Recorded File: {recordedUri}</Text>}
    </View>
  );
};

export default VoiceRecord;