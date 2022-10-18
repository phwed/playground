/*
 *  This is an example of a basic zIndex top sheet component.
 */

// dependencies
import {
  Box,
  Text,
  Icon,
  Button,
  IconButton,
  Center,
  HStack,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, {
  SlideInLeft,
  SlideInDown,
  SlideOutUp,
  Layout,
  Easing,
  SlideOutLeft,
} from "react-native-reanimated";

export default function TopSheet() {
  // set constant height for the top sheet
  const TOP_SHEET_HEIGHT_COLLAPSED = hp("30%");
  const TOP_SHEET_HEIGHT_EXPANDED = hp("84%");

  //   change the height of the top sheet based on the state
  const [toggleHeight, setToggleHeight] = React.useState(false);

  // create dummy array
  const [dummyArray, setDummyArray] = React.useState([]);

  //   function to add to dummy array
  function addToDummyArray() {
    setDummyArray([
      ...dummyArray,
      {
        id: dummyArray.length,
        text: Math.random().toString(36).substring(2, 7),
      },
    ]);
  }

  console.log(dummyArray);

  return (
    <Box flex={1} safeAreaBottom>
      {/* top sheet */}
      <Animated.View
        entering={SlideInDown.springify()}
        exiting={SlideOutUp.springify()}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "white",
          zIndex: 100,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 10,
          height: toggleHeight
            ? TOP_SHEET_HEIGHT_EXPANDED
            : TOP_SHEET_HEIGHT_COLLAPSED,
        }}
      >
        <Box
          bg="blue.800"
          px={5}
          safeAreaTop
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
          height={
            // if the state is true, set the height to the expanded height
            !toggleHeight
              ? TOP_SHEET_HEIGHT_COLLAPSED
              : TOP_SHEET_HEIGHT_EXPANDED
          }
          zIndex={1}
          // the trick is to make it absolute so that it does not interfere with the rest of the content
          position="absolute"
          top={0}
          left={0}
          right={0}
        >
          <Box flex={1} bg="amber.100" p={5}>
            <Center bg="amber.300" py={10} mb={5}>
              <Text>header content</Text>
            </Center>
            {/* hides content when height is collapsed shows when its expanded */}
            {toggleHeight && (
              <Center flex={1} bg="amber.400">
                <Text>body content</Text>
              </Center>
            )}
          </Box>
          <Box bg="red.200">
            {/* button to toggle height */}
            <IconButton
              onPress={() => setToggleHeight(!toggleHeight)}
              icon={
                <Icon
                  as={Feather}
                  name={toggleHeight ? "chevron-up" : "chevron-down"}
                  size="xl"
                  color="white"
                />
              }
            />
          </Box>
        </Box>
      </Animated.View>

      {/* content*/}
      <ScrollView marginTop={TOP_SHEET_HEIGHT_COLLAPSED} padding={10}>
        {/* add item to list */}
        <Button
          my={5}
          // add item to dummy array
          onPress={() => addToDummyArray()}
        >
          add item
        </Button>
        <HStack
          flexWrap={"wrap"}
          alignItems="center"
          justifyContent={"space-evenly"}
        >
          {/* create dummy boxes */}
          {dummyArray.map((item, index) => (
            <Animated.View
              key={item.id}
              layout={Layout.springify()}
              entering={SlideInLeft.springify()}
              exiting={SlideOutLeft.springify()}
              style={{
                padding: 30,
                backgroundColor: "skyblue",
                marginBottom: 10,
                width: "100%",
              }}
            >
              <HStack alignItems={"center"}>
                <Text flex={1}>{item.text}</Text>
                <IconButton
                  variant={"solid"}
                  onPress={() => {
                    //   remove selected item
                    setDummyArray(dummyArray.filter((i) => i.id !== item.id));
                  }}
                  icon={
                    <Icon as={Feather} name="trash" size="md" color="red.500" />
                  }
                />
              </HStack>
            </Animated.View>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
}
