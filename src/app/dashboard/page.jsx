"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import QuickLogin from "../../api/QuickLoginSocket";


const Page = () => {
    return (
        <Flex>
            <QuickLogin />
        </Flex>
    );
}

export default Page;