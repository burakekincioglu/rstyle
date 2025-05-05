import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import Animated, {
    FadeIn,
    interpolate,
    LinearTransition,
    SlideInLeft,
    SlideInRight,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppStackParamList } from "../AppNavigator";

const gap = 10;

interface HeadTextProps {
  text?: string;
  side?: "left" | "right";
  image?: ImageSourcePropType;
}

const HeadText = (props: HeadTextProps) => {
  const { text, side, image } = props;
  const [totalWidth, setTotalWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const width = totalWidth - textWidth - gap;

  const Transition = LinearTransition.delay(1650)
    .springify()
    .damping(18)
    .stiffness(50);
  const LeftSlide = SlideInLeft.delay(1500)
    .springify()
    .damping(18)
    .stiffness(50);
  const RightSlide = SlideInRight.delay(1500)
    .springify()
    .damping(18)
    .stiffness(50);

  return (
    <Animated.View
      entering={FadeIn.delay(1000).springify().damping(18).stiffness(50)}
      layout={Transition}
      onLayout={(event) => {
        setTotalWidth(event.nativeEvent.layout.width);
      }}
      style={styles.headerContainer}
    >
      {Boolean(width > 0) && side === "left" && (
        <Animated.View
          entering={LeftSlide}
          style={[styles.embedImage, { width }]}
        >
          <Image source={image} style={styles.image} />
        </Animated.View>
      )}
      {Boolean(text) && (
        <Animated.Text
          layout={Transition}
          onLayout={(event) => {
            setTextWidth(event.nativeEvent.layout.width);
          }}
          style={styles.headText}
        >
          {text}
        </Animated.Text>
      )}
      {Boolean(width > 0) && side === "right" && (
        <Animated.View
          entering={RightSlide}
          style={[styles.embedImage, { width }]}
        >
          <Image source={image} style={styles.image} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default function WelcomeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const ref = useAnimatedRef<Animated.ScrollView>();
  const scroll = useScrollViewOffset(ref);
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  const headerStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateY: interpolate(scroll.value, [0, 100], [50, 0], "clamp") },
      ],
    }),
    []
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle() {
        return (
          <View
            style={{
              overflow: "hidden",
              paddingBottom: 9,
              marginBottom: -9,
            }}
          >
            <Animated.View style={headerStyle}>
              <Animated.Text>Welcome Screen 🎯</Animated.Text>
            </Animated.View>
          </View>
        );
      },
    });
  }, [scroll]);


  return (
    <Animated.ScrollView ref={ref}>
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={{ gap }}>
        <HeadText
          text="Bugün"
          side="right"
          image={require("../assets/images/one.jpg")}
        />
        <HeadText
          text="Hava"
          side="right"
          image={require("../assets/images/two.jpg")}
        />
        <HeadText
          text="Çok Güzel"
          side="left"
          image={require("../assets/images/three.jpg")}
        />
        <HeadText side="right" image={require("../assets/images/four.jpg")} />
      </View>
    </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "center",
    gap: gap,
    height: 80,
  },
  embedImage: {
    height: 80,
    borderRadius: 22,
    overflow: "hidden",
  },
  headText: {
    fontSize: 70,
    fontWeight: "700",
    color: "#0C1824",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});