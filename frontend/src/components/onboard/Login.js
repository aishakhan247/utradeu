import { Grid, GridItem } from "@chakra-ui/react";
import SigninForm from "../onboard/SigninForm";

function Login() {
  return (
    <Grid
      h='100vh'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(12, 1fr)'
      gap={1}
    >
      <GridItem rowSpan={1} colSpan={12} bg='white'>
        <SigninForm />
      </GridItem>
    </Grid>
  );
}

export default Login;
