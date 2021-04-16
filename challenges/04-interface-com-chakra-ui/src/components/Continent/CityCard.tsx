import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface CityCardProps {
  city: string;
  country: string;
  image: string;
  flag: string;
}

export function CityCard({
  city,
  country,
  image,
  flag
}: CityCardProps) {
  return (
    <Box
      bg="white"
      border="1px"
      borderColor="yellow.300"
      borderRadius="base"
      overflow="hidden"
    >
      <Image 
        src={image}
        alt={city}
        objectFit="cover"
        w="100%"
        h="44"
      />

      <Flex justify="space-between" align="center" p="6" pt="4">
        <Box>
          <Heading as="h5" fontSize="xl" fontWeight="semibold">
            {city}
          </Heading>
          <Text mt="3" color="gray.500" fontWeight="medium">
            {country}
          </Text>
        </Box>

        <Image
          src={flag}
          alt={country}
          borderRadius="full"
          objectFit="cover"
          w="30px"
          h="30px"
        />
      </Flex>
    </Box>
  )
}