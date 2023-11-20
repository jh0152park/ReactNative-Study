import React, {useEffect, useState} from 'react';
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

function App() {
  const [y, setY] = useState(0);
  const [intercalId, setIntercalId] = useState<NodeJS.Timeout>();

  function moveUp() {
    const id = setInterval(() => setY(prev => prev + 1), 10);
    setIntercalId(id);
  }

  useEffect(() => {
    if (y === 200) {
      clearInterval(intercalId);
    }
  }, [y, intercalId]);

  return (
    <Container>
      <Box
        onPress={moveUp}
        style={{
          transform: [
            {
              translateY: y,
            },
          ],
        }}
      />
    </Container>
  );
}

export default App;
