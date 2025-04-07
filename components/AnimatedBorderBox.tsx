import {
    Canvas,
    DashPathEffect,
    Path,
    Skia
} from '@shopify/react-native-skia';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

interface AnimatedBorderBoxProps {
  width: number;
  height: number;
}

const AnimatedBorderBox: React.FC<AnimatedBorderBoxProps> = ({ width, height }) => {
  const strokeWidth = 4;
  const segmentLength = 20;
  const animationDuration = 2000;
  const backgroundColor = '#000080'; // Lacivert
  const strokeColor = '#FFFFFF'; // Beyaz

  const padding = strokeWidth / 2;
  const rectX = padding;
  const rectY = padding;
  const rectWidth = width - strokeWidth;
  const rectHeight = height - strokeWidth;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: animationDuration
      }),
      -1,
      false
    );
  }, [animationDuration]);

  const backgroundPath = useMemo(() => {
    const path = Skia.Path.Make();
    const cornerRadius = 16; // Köşe yarıçapı
    const roundRect = Skia.RRectXY(Skia.XYWHRect(rectX, rectY, rectWidth, rectHeight), cornerRadius, cornerRadius);
    path.addRRect(roundRect);
    return path;
  }, [rectX, rectY, rectWidth, rectHeight]);

  const borderPath = useMemo(() => {
    const path = Skia.Path.Make();
    const cornerRadius = 16;
    const roundRect = Skia.RRectXY(Skia.XYWHRect(rectX, rectY, rectWidth, rectHeight), cornerRadius, cornerRadius);
    path.addRRect(roundRect);
    return path;
  }, [rectX, rectY, rectWidth, rectHeight]);

  const pathLength = useMemo(() => {
    return 2 * (rectWidth + rectHeight);
  }, [rectWidth, rectHeight]);

  const dashPhase = useDerivedValue(() => -progress.value * pathLength, [progress, pathLength]);

  return (
    <View style={{ width, height }}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Path
          path={backgroundPath}
          color={backgroundColor}
          style="fill"
        />
        <Path
          path={borderPath}
          color={strokeColor}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeJoin="round"
          strokeCap="round"
        >
          <DashPathEffect
            intervals={[segmentLength, pathLength - segmentLength]}
            phase={dashPhase}
          />
        </Path>
      </Canvas>
    </View>
  );
};

export default AnimatedBorderBox;
