import { useNavigation } from '@react-navigation/native';
import { AudioLines } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Alert, Button, PermissionsAndroid, Platform, Pressable, StyleSheet, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { colors } from '../utils/colors';

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecord = () => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioPath, setAudioPath] = useState<string | null>(null);
  const recordRef = useRef<string | null>(null);

  const navigation = useNavigation()

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

    const path = Platform.OS === 'ios' ? 'not.m4a' : `not.mp3`;
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
      if (result) {
        navigation.navigate('NewRecording', { params: undefined })
      }
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
    <View style={style.container}>
      <Button color={colors.white} title="Kaydı Oynat" onPress={playRecording} disabled={!audioPath || playing} />
      <Pressable style={style.voiceContainer} onPress={recording ? stopRecording : startRecording} >
        <AudioLines size={40} color={recording ? colors.blue : colors.darkgray} />
      </Pressable>
    </View>
  );
};

export default VoiceRecord;

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkgray, },
  voiceContainer: {backgroundColor: colors.white, 
                   width: 80, 
                   height: 80, 
                   borderRadius: 40,
                   justifyContent: "center",
                   alignItems: "center",
                   position: "absolute",
                   alignSelf: "center",
                   bottom: 100
                  }
})
