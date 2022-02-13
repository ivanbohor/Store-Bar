import React from 'react';
import { Box, ChakraProvider, Container, Divider, Heading, Text, VStack } from '@chakra-ui/react'
import {AppProps} from "next/app";
import theme from '../theme';

const  App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
    <Box padding={4}>
    <Container backgroundColor="white"
     boxShadow="md" marginY={4} maxWidth="container.xl" padding={4}>
      <VStack marginBottom={6}>
        <Heading>Tu plato</Heading>
        <Text>Descripcion Lorem ipsue ex ratione voluptatem. Ratione deleniti libero rerum impedit est soluta dicta, eius officia. </Text>
      </VStack>
      <Divider marginY={6}/>
      <Component {...pageProps} />
    </Container>
    </Box>
    </ChakraProvider>
  )
}

export default App