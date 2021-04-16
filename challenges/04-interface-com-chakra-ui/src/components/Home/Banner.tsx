import { Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";

export function Banner() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      h="20.9rem"
      bgImg="url('/background.png')"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <Flex
        w="100%"
        maxWidth={1208}
        mx="auto"
        px="6"
        align="center"
        justify="space-between"
      >
        <Flex direction="column" maxWidth={520}>
          <Heading color="gray.50" fontWeight="medium">
            5 Continentes, infinitas possibilidades.
          </Heading>

          <Text mt="5" color="gray.300" fontSize="xl">
            Chegou a hora de tirar do papel a viagem que você sempre sonhou. 
          </Text>
        </Flex>

        {isWideVersion && <Image src="/airplane.svg" alt="Airplane" mt="24" />}
      </Flex>
    </Flex>
  )
}