# 1. Simple Move


https://github.com/jh0152park/ReactNative-Study/assets/118165975/837564d3-f212-4213-b73e-364e8a58a12e


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


https://github.com/jh0152park/ReactNative-Study/assets/118165975/9af18ab0-6ffe-4719-940a-72fca39c6dda


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
