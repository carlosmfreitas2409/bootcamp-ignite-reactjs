import Link from 'next/link';
import { Flex, Heading, Text, Image, Link as ChakraLink } from "@chakra-ui/react";

interface SlideItemProps {
  id: number;
  name: string;
  curiosity: string;
  imageSrc: string;
}

export function SlideItemDetails({
  id,
  name,
  curiosity,
  imageSrc
}: SlideItemProps) {
  return (
    <Link href={`/continents/${id}`} passHref>
      <ChakraLink
        w="100%"
        h="450px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={imageSrc}
          alt={name}
          w="100%"
          objectFit="cover"
        />

        <Flex direction="column" align="center" position="absolute">
          <Heading color="gray.50" fontSize={["2xl", "5xl"]}>{name}</Heading>
          <Text
            color="gray.300"
            fontSize={["md", "2xl"]}
            fontWeight="bold"
            mt={["2", "4"]}
          >
            {curiosity}
          </Text>
        </Flex>
      </ChakraLink>
    </Link>
  )
}