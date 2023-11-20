import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

function App() {
  const Y = new Animated.Value(0);

  function moveUp() {}

  return (
    <Container>
      <Box onPress={moveUp} />
    </Container>
  );
}

export default App;
