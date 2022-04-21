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

export default function TopSheet() {
  const TOP_SHEET_HEIGHT_COLLAPSED = hp("30%");
  const TOP_SHEET_HEIGHT_EXPANDED = hp("84%");

  const [toggleHeight, setToggleHeight] = React.useState(false);

  return (
    <Box flex={1} safeAreaBottom>
      {/* top sheet */}
      <Box
        bg="blue.800"
        px={5}
        safeAreaTop
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        height={
          !toggleHeight ? TOP_SHEET_HEIGHT_COLLAPSED : TOP_SHEET_HEIGHT_EXPANDED
        }
        zIndex={1}
        position="absolute"
        top={0}
        left={0}
        right={0}
      >
        <Box flex={1} bg="amber.100" p={5}>
          <Center bg="amber.300" py={10} mb={5}>
            <Text>header content</Text>
          </Center>

          {toggleHeight && (
            <Center flex={1} bg="amber.400">
              <Text>body content</Text>
            </Center>
          )}
        </Box>
        <Box bg="red.200">
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

      {/* content*/}
      <ScrollView marginTop={TOP_SHEET_HEIGHT_COLLAPSED} padding={10}>
        <HStack
          flexWrap={"wrap"}
          space={10}
          alignItems="center"
          justifyContent={"flex-start"}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Box key={i} bg="blue.100" p={10} mb={5}>
              <Text>{i}</Text>
            </Box>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
}
