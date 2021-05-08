import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import Card, { Cards, heightCard as heightCardDefault } from "../Component";

export const margin = 16;
export const heightCard = heightCardDefault + margin * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;

interface CardAnimationProps {
  y: Animated.Value;
  index: number;
  type: Cards;
}

const CardAnimation = ({ type, y, index }: CardAnimationProps) => {
  const position = Animated.subtract(index * heightCard, y);
  const isDisappearing = -heightCard;
  const isTop = 0;
  const isBottom = height - heightCard;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * heightCard],
        outputRange: [0, -index * heightCard],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -heightCard / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
      key={index}
    >
      <Card {...{ type }} />
    </Animated.View>
  );
};

export default CardAnimation;

const styles = StyleSheet.create({
  card: {
    marginVertical: margin,
    alignSelf: "center",
  },
});
