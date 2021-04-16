import { useRouter } from "next/router";
import { Flex, Icon, Image } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";

interface HeaderProps {
  hasArrowBack?: boolean;
}

export function Header({ hasArrowBack = false }: HeaderProps) {
  const router = useRouter();

  return (
    <Flex
      as="header"
      h="24"
      w="100%"
      maxWidth={1208}
      mx="auto"
      px="6"
      align="center"
    >
      {hasArrowBack && <Icon
        as={FiChevronLeft}
        fontSize="3xl"
        cursor="pointer"
        onClick={() => router.back()}
      />}

      <Image src="/logo.svg" alt="World Trip" mx="auto" />
    </Flex>
  )
}