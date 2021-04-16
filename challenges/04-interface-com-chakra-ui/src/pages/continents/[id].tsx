import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import { Banner } from "../../components/Continent/Banner";
import { Info } from "../../components/Continent/Info";
import { CityCard } from "../../components/Continent/CityCard";

type City = {
  id: number;
  name: string;
  country: string;
  flag: string;
  image: string;
}

type Continent = {
  name: string;
  description: string;
  image: string;
  countries: number;
  languages: number;
  cities100: number;
  cities: City[];
}

interface ContinentDetailsProps {
  continent: Continent;
}

export default function ContinentDetails({ continent }: ContinentDetailsProps) {
  return (
    <>
      <Head>
        <title>{continent.name} | World Trip</title>
      </Head>

      <Header hasArrowBack />

      <Flex as="main" direction="column" h="100%">
        <Banner name={continent.name} image={continent.image} />

        <Flex
          direction="column"
          w="100%"
          maxWidth={1208}
          mx="auto"
          my={["12", null, "28"]}
          px="6"
        >
          <Flex justify="space-around" align="center" direction={["column", "row"]}>
            <Text maxWidth={600} textAlign="justify" fontSize="2xl">
              {continent.description}
            </Text>

            <Info
              mt={["12", null]}
              languages={continent.languages}
              countries={continent.countries}
              cities100={continent.cities100}
            />
          </Flex>

          <Flex as="section" mt={["10", "20"]} direction="column">
            <Heading fontWeight="medium" mb={["6", "10"]}>
              Cidades +100
            </Heading>

            <SimpleGrid minChildWidth="256px" spacing={["6", "10"]}>
              {continent.cities.map(city => (
                <CityCard
                  key={city.id}
                  city={city.name}
                  country={city.country}
                  image={city.image}
                  flag={city.flag}
                />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const response = await api.get(`/continents/${id}?_embed=cities`);

  return {
    props: {
      continent: response.data
    }
  }
}