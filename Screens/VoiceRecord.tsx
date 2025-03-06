import React, { useRef, useState } from 'react';
import { Alert, Button, PermissionsAndroid, Platform, Text, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecord = () => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const recordRef = useRef<string | null>(null);

  // 📌 Mikrofon izni al
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.MICROPHONE);
      return result === RESULTS.GRANTED;
    }
  };

  // 🎤 Ses kaydını başlat
  const startRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('İzin Gerekli', 'Mikrofon izni verilmelidir.');
      return;
    }

    const path = Platform.OS === 'ios' ? 'hello.m4a' : `${Date.now()}.mp3`;
    recordRef.current = path;

    try {
      await audioRecorderPlayer.startRecorder(path);
      setRecording(true);
    } catch (error) {
      console.error('Kayıt başlatılamadı', error);
    }
  };

  // ⏹ Ses kaydını durdur
  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      console.log(result);
      
      setAudioPath(result);
      setRecording(false);
    } catch (error) {
      console.error('Kayıt durdurulamadı', error);
    }
  };

  // ▶️ Kaydedilen sesi çal
  const playRecording = async () => {
    if (!audioPath) {
      Alert.alert('Hata', 'Önce bir kayıt yapmalısınız.');
      return;
    }

    try {
      await audioRecorderPlayer.startPlayer(audioPath);
      setPlaying(true);

      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition === e.duration) {
          setPlaying(false);
          audioRecorderPlayer.stopPlayer();
        }
      });
    } catch (error) {
      console.error('Ses oynatılamadı', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Ses Kaydedici</Text>

      <Button title={recording ? 'Kaydı Durdur' : 'Kaydı Başlat'} onPress={recording ? stopRecording : startRecording} />
      <View style={{ height: 20 }} />

      <Button title="Kaydı Oynat" onPress={playRecording} disabled={!audioPath || playing} />
    </View>
  );
};

export default VoiceRecord;
