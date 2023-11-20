import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: teal;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

function App() {
  const [up, setUp] = useState(false);
  const POSITION = useRef(new Animated.ValueXY({x: 0, y: 250})).current;
  const rotation = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-360deg', '360deg'],
  });

  const BGColor = POSITION.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ['rgb(246, 250, 45)', 'rgb(83, 255, 71)'],
  });

  function toggleUp() {
    setUp(prev => !prev);
  }

  function moveUp() {
    Animated.timing(POSITION, {
      toValue: up ? 250 : -250,
      useNativeDriver: true,
      duration: 1000,
    }).start(toggleUp);
  }

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            backgroundColor: BGColor,
            transform: [{translateY: POSITION.y}, {rotateY: rotation}],
          }}
        />
      </Pressable>
    </Container>
  );
}

export default App;
