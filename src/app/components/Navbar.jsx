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
import logo from "../../../public/logo.png";

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
  const onDashboard = location.pathname.startsWith("/dashboard");

  const ColorModeSwitcher = () => {
    return (
      <Button onClick={toggleColorMode} sx={linkStyle}>
        {colorMode === "light" ? <MoonIcon color="white" /> : <SunIcon />}
      </Button>
    );
  };

  const dashboardLinks = (
    <>
      <ChakraLink as={Link} to="/dashboard" sx={linkStyle}>
        Dashboard
      </ChakraLink>
      <ChakraLink as={Link} to="/dashboard/resources" sx={linkStyle}>
        Resources
      </ChakraLink>
      <ChakraLink as={Link} to="/dashboard/directory" sx={linkStyle}>
        Directory
      </ChakraLink>
      <ChakraLink as={Link} to="/dashboard/syllabus" sx={linkStyle}>
        Syllabus
      </ChakraLink>
    </>
  );

  const publicLinks = (
    <>
      <ChakraLink as={Link} to="/about" sx={linkStyle}>
        About
      </ChakraLink>
      <ChakraLink as={Link} to="/sponsorships" sx={linkStyle}>
        Sponsorships
      </ChakraLink>
      <ChakraLink as={Link} to="/applications" sx={linkStyle}>
        Applications
      </ChakraLink>
      <ChakraLink as={Link} to="/login" sx={linkStyle}>
        Login
      </ChakraLink>
    </>
  );

  const allLinks = (
    <>
      <MenuItem as={Link} to="/dashboard">
        Dashboard
      </MenuItem>
      <MenuItem as={Link} to="/dashboard/resources">
        Resources
      </MenuItem>
      <MenuItem as={Link} to="/dashboard/directory">
        Directory
      </MenuItem>
      <MenuItem as={Link} to="/dashboard/syllabus">
        Syllabus
      </MenuItem>
      <MenuItem as={Link} to="/about">
        About
      </MenuItem>
      <MenuItem as={Link} to="/sponsorships">
        Sponsorships
      </MenuItem>
      <MenuItem as={Link} to="/applications">
        Applications
      </MenuItem>
      <MenuItem as={Link} to="/login">
        Login
      </MenuItem>
    </>
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bgGradient={
        onDashboard
          ? "linear(to-r, pink.500, purple.500)"
          : "linear(to-r, orange.500, pink.500)"
      }
      color="white"
    >
      <Flex align="center">
        <ChakraLink as={Link} to="/" display="flex" alignItems="center">
          <Image src={logo} boxSize="50px" pb="4px" marginRight="12px" />
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
            {onDashboard ? (
              <>
                {allLinks}
                <MenuItem>
                  <ColorModeSwitcher />
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem as={Link} to="/about">
                  About
                </MenuItem>
                <MenuItem as={Link} to="/sponsorships">
                  Sponsorships
                </MenuItem>
                <MenuItem as={Link} to="/applications">
                  Applications
                </MenuItem>
                <MenuItem as={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem>
                  <ColorModeSwitcher />
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      ) : (
        <Box display="flex" alignItems="center">
          {onDashboard ? (
            <>
              {dashboardLinks}
              <ColorModeSwitcher />
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  color="white"
                  borderRadius="md"
                  border="2px solid white"
                  backgroundColor="rgba(255, 255, 255, 0.2)"
                  _hover={{
                    textDecoration: "none",
                    backgroundColor: "white",
                    color: "purple.600",
                  }}
                />
                <MenuList>
                  <MenuItem as={Link} to="/about">
                    About
                  </MenuItem>
                  <MenuItem as={Link} to="/sponsorships">
                    Sponsorships
                  </MenuItem>
                  <MenuItem as={Link} to="/applications">
                    Applications
                  </MenuItem>
                  <MenuItem as={Link} to="/login">
                    Login
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            publicLinks
          )}
          {!isMobile && !onDashboard && <ColorModeSwitcher />}
        </Box>
      )}
    </Flex>
  );
}

export default Navbar;
