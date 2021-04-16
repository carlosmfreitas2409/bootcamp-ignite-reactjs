import { Box, Flex, Heading } from "@chakra-ui/react";

interface BannerProps {
  name: string;
  image: string;
}

export function Banner({ name, image }: BannerProps) {
  return (
    <Box
      bg={`linear-gradient(0deg, rgba(28, 20, 1, 0.35), rgba(28, 20, 1, 0.35)), url('${image}')`}
      // bgImg=""
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <Flex
        h="31.25rem"
        w="100%"
        maxWidth={1208}
        mx="auto"
        px="6"
        py="14"
        align="flex-end"
      >
        <Heading color="gray.50" fontSize="5xl" fontWeight="medium">
          {name}
        </Heading>
      </Flex>
    </Box>
  )
}