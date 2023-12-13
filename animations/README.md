# 1. Simple Move

```JS
function App() {
    const Y = new Animated.Value(0);

    function moveUp() {
        Animated.timing(Y, {
            toValue: -200,
            useNativeDriver: true,
        }).start();
    }

    Y.addListener(() => {
        console.log(Y);
    });

    return (
        <Container>
            <TouchableOpacity onPress={moveUp}>
                <AnimatedBox style={{transform: [{translateY: Y}]}} />
            </TouchableOpacity>
        </Container>
    );
}
```

# 2. Simple Move with Bounce

```JS
function App() {
    const Y = new Animated.Value(0);

    function moveUp() {
        Animated.spring(Y, {
            toValue: -200,
            bounciness:500,
            useNativeDriver: true,
        }).start();
    }

    Y.addListener(() => {
        console.log(Y);
    });

    return (
        <Container>
            <TouchableOpacity onPress={moveUp}>
                <AnimatedBox style={{transform: [{translateY: Y}]}} />
            </TouchableOpacity>
        </Container>
    );
}
```
