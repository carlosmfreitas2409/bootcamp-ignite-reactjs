import { ChakraProps, SimpleGrid } from "@chakra-ui/react";
import { InfoItem } from "./InfoItem";

interface InfoProps extends ChakraProps {
  countries: number;
  languages: number;
  cities100: number;
}

export function Info({ languages, countries, cities100, ...rest }: InfoProps) {
  return (
    <SimpleGrid flex="1" minChildWidth="165px" {...rest} spacing="4">
      <InfoItem counter={countries} description="países" />

      <InfoItem counter={languages} description="línguas" />

      <InfoItem
        counter={cities100}
        description="cidades +100"
        tooltipInfo="Cidades entre as 100 mais visitadas do mundo"
      />
    </SimpleGrid>
  )
}