import * as React from "react";
import { GetStaticProps } from "next";
import { Product } from "./product/types";
import api from "./product/api";
import { Box, Button, Flex, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";
interface Props {
  products: Product [];
}
function parseCurrency (value:number) :string {
  return value.toLocaleString("es-AR",{
    style:"currency",
    currency:"ARS",
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<Product[]>([])

  const text = React.useMemo(
    () =>
    cart
    .reduce(
      (message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
      ``,
      )
    .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product)=> total + product.price, 0))}`),
    [cart],  
    )

  return (
  <AnimateSharedLayout type="crossfade">
    <Stack spacing={6}> 
    <Grid gridGap={6} templateColumns="repeat(auto-fill, mimmax(240px, 1fr))">
    {products.map((product)=>( 
    <Stack spacing={3} borderRadius="md" padding={4} 
    backgroundColor="gray.100" key={product.id}>
      <Image alt={product.title}
      as={motion.img} cursor="pointer" layoutId={product.image} maxHeight={128} src={product.image} />
      <Stack spacing={1}>
      <Text>{product.title} </Text>
      <Text fontSize="sm" fontWeight="500" 
      color="green.500">{parseCurrency(product.price)} </Text>
      </Stack>
      <Button colorScheme="primary" variant="outline" 
      onClick={() => setCart ((cart) => cart.concat(product))}>
         Agregar 
      </Button>
    </Stack>
     ))} 
    </Grid>
    {Boolean(cart.length) && (
    <Flex alignItems="center" justifyContent="center" 
    bottom={4} position="sticky">
      <Button
      padding={4}
     isExternal 
     as={Link}
    href={`https://wa.me/5491131155989?text=-BAR ESPAÑOL-MI PEDIDO\n${encodeURIComponent(text)}`}
    colorScheme="whatsapp"
    size="lg"
    width="fit-content"
    leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"/>}>Completar Pedido({cart.length} productos)
    </Button>
    </Flex>
    )}
 </Stack>
  </AnimateSharedLayout>
  )
}
 

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    revalidate:10,
  props:{
    products,
  },
 };
};



export default IndexRoute;