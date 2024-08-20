

import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import Swiper from "react-native-swiper";
const slides = [
  {
    image: require("../../assets/images/Group 44.png"),
    title: "Quality",
    backgroundColor: "#5ea25f",
    info: "Sell your farm fresh products directly to consumers, cutting out the middleman and reducing emissions of the global supply chain.",
  },
  {
    image: require("../../assets/images/Group.png"),
    title: "Convenient",
    backgroundColor: "#d5715b",
    info: "Our team of delivery drivers will make sure your orders are picked up on time and promptly delivered to your customers.",
  },
  {
    image: require("../../assets/images/Group 46.png"),
    title: "Local",
    backgroundColor: "#f8c569",
    info: "We love the earth and know you do too! Join us in reducing our local carbon footprint one order at a time.",
  },
];

const OnboardingPage = ({ navigation }: any) => {
  const currentIndex = useRef(0);
  const textOpacity = useRef(new Animated.Value(0)).current;
  const [currentSlide, setCurrentSlide] = useState(slides[0]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    handleSlideChange(currentIndex.current);
  }, []);

  const handleSlideChange = (index: number) => {
    currentIndex.current = index;
    setCurrentSlide(slides[index]);

    // Reset animation value for the next slide
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      // Trigger animation
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false}
        loop={false}
        showsPagination={false}
        onIndexChanged={handleSlideChange}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image
              source={slide.image}
              style={[{ backgroundColor: slide.backgroundColor }, styles.image]}
              resizeMode="contain"
            />
          </View>
        ))}
      </Swiper>
      <View style={styles.whiteContainer}>
        <Animated.View style={{ opacity: textOpacity }}>
          <Text style={styles.title}>{slides[currentIndex.current].title}</Text>
          <Text style={styles.info}>{slides[currentIndex.current].info}</Text>
        </Animated.View>
        <View style={styles.footer}>
          <View style={{ flexDirection: "row", height: 60 }}>
            {slides.map((_, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 18, 8],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  style={[styles.dot, { width: dotWidth }]}
                  key={i.toString()}
                />
              );
            })}
          </View>
          <TouchableOpacity
            style={[
              styles.joinBtn,
              { backgroundColor: currentSlide.backgroundColor },
            ]}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.joinBtnText}>Join the movement!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  slide: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  whiteContainer: {
    marginTop: -30,
    alignItems: "center",
    width: "100%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 1.05,
    color: "#261C12",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  footer: {
    position: "absolute",
    bottom: 70,
    width: "100%",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#261C12",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  joinBtn: {
    width: "70%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#589e5f",
    justifyContent: "center",
    alignItems: "center",
  },
  joinBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  loginBtnText: {
    color: "#261C12",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default OnboardingPage;
