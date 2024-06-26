import React from "react";
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

function Navbar() {
  const linkStyle = {
    marginRight: "5",
    padding: "3px 10px",
    borderRadius: "md",
    border: "2px solid white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    _hover: {
      textDecoration: "none",
      backgroundColor: "white",
      color: "purple.600",
    },
    fontSize: "md",
  };
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const ColorModeSwitcher = () => {
    return (
      <Button onClick={toggleColorMode} sx={linkStyle}>
        {colorMode === "light" ? <MoonIcon color="white" /> : <SunIcon />}
      </Button>
    );
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bgGradient="linear(to-r, blue.500, green.500)"
      color="white"
    >
      <Flex align="center">
        <ChakraLink href="https://www.kansasblockchain.org/dashboard" display="flex" alignItems="center">
          <Image alt="KBF-Logo" src='/logo.png' boxSize="50px" pb="4px" marginRight="12px" />
          <Text fontSize="md" fontWeight="bold">
            The Kansas Blockchain Fellowship
          </Text>
        </ChakraLink>
      </Flex>
      {isMobile ? (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            color="white"
          />
          <MenuList>
              <MenuItem href="/about">
                About
              </MenuItem>
              <MenuItem href="/sponsorships">
                Sponsorships
              </MenuItem>
              <MenuItem href="https://www.kansasblockchain.org/dashboard">
                Dashboard
              </MenuItem>
              <MenuItem onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon color="white" /> : <SunIcon />}
              </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Box display="flex" alignItems="center">
          <ChakraLink href="/portal" sx={linkStyle}>
            Portal Home
          </ChakraLink>
          <ChakraLink href="/quizzes" sx={linkStyle}>
            My Quizzes
          </ChakraLink>
          <ChakraLink href="/nft_walkthrough" sx={linkStyle}>
            KBF NFT
          </ChakraLink>
          <ChakraLink href="https://www.kansasblockchain.org/dashboard" sx={linkStyle}>
            Dashboard
          </ChakraLink>
          <ColorModeSwitcher />
        </Box>
      )}
    </Flex>
  );
}

export default Navbar;
