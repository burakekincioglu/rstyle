import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStackScreenProps } from '../AppNavigator';
import { apiKeys } from '../api/keys';
import { moderateGROQapi } from '../api/utils';
import { navigate } from '../utils/navigate';
import { constants } from './constants';

interface NewRecordingProps extends AppStackScreenProps<'NewRecording'> {}

const NewRecording = (props: NewRecordingProps) => {
    const uri = props.route.params.uri
    const [text, setText] = useState('')
    const [result, setResult] = useState('')

    useEffect(() => {    
      handleTranscribe()
    }, [uri])

    const searchInScreenNames = (searchTerm: string) => {
      return Object.keys(constants.ScreenNames).find((key) => key === searchTerm) || "";
    };
    
    const rules = `
    Bir mobil uygulamada kullanıcıyı(user) dinleyerek yapmak istediği işlemi algıladıktan sonra 
    ona bu işlemi yapacağı sayfanın ismini söyle. Sayfanın ismini belirlerken aşağıdaki kurallara dikkat et:
    1) Kullanıcının yapmak istediği işlem hangi sayfanın açıklamarındaki anahtar kelime ile en çok eşleşiyor ise o sayfayı öner.
    2) Eğer kullacnıcın yapmak istediği şey hiçbir sayfa tanımına uymuyorsa "uygunsuz" yanıtını dön.
    Sayfa isimleri ve açıklamaları şunlar:
      Home: 'Home', // Ana sayfa
      PagingDots: '𝍌 PagingDots', // Sayfa dönüşleri, pagination örnekleri içerir
      ExploreInterpolate: '🗂️ ExploreInterpolate', // İnterpolasyon, animation örnekleri içerir, renkli kartların animasyonu
      DoubleTapLikeGesture: '💗 DoubleTapLikeGesture', // Çift tıklama, like butonu, kalp animasyonu
      PangestureGame: '🎯 PangestureGame', // Çok yönlü dokunma, game örnekleri içerir, sürükleme, dokunma, örnekleri içerir
      Schedule: '🗓️ Schedule', // Takvim, schedule örnekleri içerir
      Leaderboard: '📊 Leaderboard', // Sıralama, leaderboard örnekleri içerir, sıralama, puanlama, örnekleri içerir
      Pagination: '𝍌 Pagination', // Sayfa dönüşleri, pagination örnekleri içerir, sayfa dönüşleri, örnekleri içerir, yeşil noktalar
      CircularCarousel: '👓 CircularCarousel', // Dairesel kutu, circular carousel örnekleri içerir, dairesel kutu, örnekleri içerir, dairesel kutu, örnekleri içerir, havalı, blur, animasyon
      VoiceRecord: '🎙️ VoiceRecord', // Ses kaydı, voice record örnekleri içerir, ses kaydı, örnekleri içerir
      SupaBase: '💾 SupaBase', // Supabase, supabase örnekleri içerir, supabase, örnekleri içerir
      Skia: '🎨 Skia', // Skia, skia örnekleri içerir, skia, örnekleri içerir
      InfiniteScroll: '♾️ InfiniteScroll' // empty

    Örneğin kullanıcı yeşil görmek istiyorum dediğinde ona cevap olarak "Pagination" ifadesini dönmelisin. Çünkü "Pagination" 
    sayfa açıklamasında "yeşil noktalar" ifadesi var. Cevabında sadece sayfa ismi olsun. Tek kelimelik cevap vermesni istiyorum.
    `

    const handleTranscribe = async () => {
      try {
        const formData = new FormData();
        formData.append("file", {
          uri: uri,
          name: "not.m4a",
          type: "audio/m4a",
        });
        formData.append("model", "whisper-1");
        formData.append("response_format", "text");
    
        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKeys.OPENAI_KEY}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });
    
        const text = await response.text()
        setText(text)
        const result = await moderateGROQapi(text, rules)
        setResult(result)
        const screenFound = searchInScreenNames(result)
        if (screenFound === 'VoiceRecord') {
          setResult('Zaten ses kaydedici ekranındasınız.')
        }else if(screenFound.toLowerCase() === ""){
          setResult(`İlgili ekran tespit edilemedi, ${screenFound}`)
        }else if(screenFound.toLowerCase() !== 'uygunsuz'){
          navigate({name: screenFound, params: undefined})
        }else{
          setResult(`İlgili ekran tespit edilemedi, ${screenFound}`)
        }
      } catch (error) {
        console.error("Transcription error:", error);
      }
      }

  return (
    <View>
      <Text>{text}</Text>
      <Text>{result}</Text>
    </View>
  )
}

export default NewRecording

const styles = StyleSheet.create({})