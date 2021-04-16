import { Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";

export function TravelTypes() {
  return (
    <SimpleGrid
      as="section"
      flex="1"
      minChildWidth="157px"
      spacing={["12", "16"]}
    >
      <Flex direction="column" align="center">
        <Image src="/icons/cocktail.svg" alt="Cocktail" />
        <Text color="gray.600" fontWeight="semibold" fontSize="2xl" mt="6">
          vida noturna
        </Text>
      </Flex>

      <Flex direction="column" align="center">
        <Image src="/icons/surf.svg" alt="Cocktail" />
        <Text color="gray.600" fontWeight="semibold" fontSize="2xl" mt="6">
          praia
        </Text>
      </Flex>

      <Flex direction="column" align="center">
        <Image src="/icons/building.svg" alt="Cocktail" />
        <Text color="gray.600" fontWeight="semibold" fontSize="2xl" mt="6">
          moderno
        </Text>
      </Flex>

      <Flex direction="column" align="center">
        <Image src="/icons/museum.svg" alt="Cocktail" />
        <Text color="gray.600" fontWeight="semibold" fontSize="2xl" mt="6">
          clássico
        </Text>
      </Flex>

      <Flex direction="column" align="center">
        <Image src="/icons/earth.svg" alt="Cocktail" />
        <Text color="gray.600" fontWeight="semibold" fontSize="2xl" mt="6">
          e mais...
        </Text>
      </Flex>
    </SimpleGrid>
  )
}