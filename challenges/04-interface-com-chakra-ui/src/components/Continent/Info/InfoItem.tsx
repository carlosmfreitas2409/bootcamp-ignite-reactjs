import { Flex, Heading, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface InfoItemProps {
  counter: number;
  description: string;
  tooltipInfo?: string;
}

export function InfoItem({ counter, description, tooltipInfo }: InfoItemProps) {
  return (
    <Flex align="center" direction="column">
      <Heading fontSize="5xl" color="yellow.500" fontWeight="semibold">
        {counter}
      </Heading>
      
      <Heading fontSize="2xl" fontWeight="semibold" textAlign="center">
        {description}
        
        {tooltipInfo && (
          <Tooltip
            hasArrow
            label={tooltipInfo}
            placement="bottom"
            borderRadius="base"
          >
            <InfoOutlineIcon fontSize="md" color="gray.400" ml="1" />
          </Tooltip>
        )}
      </Heading>
    </Flex>
  )
}