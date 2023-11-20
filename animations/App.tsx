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
  const Y_POSITION = useRef(new Animated.Value(250)).current;
  const opacityValue = Y_POSITION.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, 0, 1],
  });

  function toggleUp() {
    setUp(prev => !prev);
  }

  function moveUp() {
    Animated.timing(Y_POSITION, {
      toValue: up ? 250 : -250,
      useNativeDriver: true,
      duration: 5000,
    }).start(toggleUp);
  }

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            opacity: opacityValue,
            transform: [{translateY: Y_POSITION}],
          }}
        />
      </Pressable>
    </Container>
  );
}

export default App;
