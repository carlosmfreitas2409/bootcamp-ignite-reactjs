import Head from 'next/head';
import { Divider, Flex, Heading } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { Banner } from "../components/Home/Banner";
import { TravelTypes } from '../components/Home/TravelTypes';
import { ContinentsSlide } from '../components/Home/ContinentsSlide';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | World Trip</title>
      </Head>
      
      <Header />

      <Flex as="main" direction="column" h="100vh">
        <Banner />

        <Flex
          direction="column"
          w="100%"
          maxWidth={1208}
          mx="auto"
          my={["12", null, "28"]}
          px="6"
        >
          <TravelTypes />

          <Divider
            w="90px"
            borderWidth="2px"
            borderColor="gray.600"
            mx="auto"
            mt={["10", "20"]}
            mb={["6", "12"]}
          />

          <Heading fontWeight="medium" color="gray.600" textAlign="center">
            Vamos nessa?
            <br/>
            Então escolha seu continente
          </Heading>

          <ContinentsSlide />
        </Flex>
      </Flex>
    </>
  )
}
