# 1. Simple Move

### Should use `useRef` to `new Animate.Value` to prevent refresh by state changed of `useState` or etc.

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

### Should use `useRef` to `new Animate.Value` to prevent refresh by state changed of `useState` or etc.

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

# 3. Simple Move Up and Down

https://github.com/jh0152park/ReactNative-Study/assets/118165975/e587d4b5-b316-4548-9ae7-ad5c91e77a03

```JS
function App() {
    const [up, setUp] = useState(false);
    const Y = useRef(new Animated.Value(0)).current;

    function moveUp() {
        Animated.timing(Y, {
            toValue: up ? 200 : -200,
            useNativeDriver: true,
        }).start(toggleUp);
    }

    function toggleUp() {
        setUp(prev => !prev);
    }

    return (
        <Container>
            <TouchableOpacity onPress={moveUp}>
                <AnimatedBox style={{transform: [{translateY: Y}]}} />
            </TouchableOpacity>
        </Container>
    );
}
```

# 4. Interpolations

```JS
function App() {
    const [up, setUp] = useState(false);
    const Y_POSITION = useRef(new Animated.Value(250)).current;

    function moveUp() {
        Animated.timing(Y_POSITION, {
            toValue: up ? 250 : -250,
            duration: 2000,
            useNativeDriver: true,
        }).start(toggleUp);
    }

    function toggleUp() {
        setUp(prev => !prev);
    }

    const opacityValue = Y_POSITION.interpolate({
        inputRange: [-250, -100, 100, 250],
        outputRange: [1, 0.3, 0.3, 1],
    });

    const borderRadius = Y_POSITION.interpolate({
        inputRange: [-250, 250],
        outputRange: [100, 0],
    });

    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox
                    style={{
                        borderRadius: borderRadius,
                        opacity: opacityValue,
                        transform: [{translateY: Y_POSITION}],
                    }}
                />
            </Pressable>
        </Container>
    );
}
```

# 5. More Interpolations

```JS
function App() {
    const [up, setUp] = useState(false);
    const Y_POSITION = useRef(new Animated.ValueXY({x: 0, y: 250})).current;

    function moveUp() {
        Animated.timing(Y_POSITION, {
            toValue: up ? 250 : -250,
            duration: 1000,
            useNativeDriver: true,
        }).start(toggleUp);
    }

    function toggleUp() {
        setUp(prev => !prev);
    }

    const opacityValue = Y_POSITION.y.interpolate({
        inputRange: [-250, -100, 100, 250],
        outputRange: [1, 0.3, 0.3, 1],
    });

    const borderRadius = Y_POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: [100, 0],
    });

    const rotation = Y_POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-360deg", "360deg"],
    });

    const backgroundColor = Y_POSITION.y.interpolate({
        inputRange: [-250, 250],
        outputRange: ["rgb(230, 255, 1)", "rgb(131, 203, 255)"],
    });

    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox
                    style={{
                        borderRadius: borderRadius,
                        opacity: opacityValue,
                        backgroundColor: backgroundColor,
                        transform: [
                            {translateY: Y_POSITION.y},
                            {rotateY: rotation},
                        ],
                    }}
                />
            </Pressable>
        </Container>
    );
}
```
