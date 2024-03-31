import { Grid, GridItem } from "@chakra-ui/react";
import SignupForm from "../onboard/SignupForm"
import YourName from "../onboard/YourName";
// import LeftSide from "../onboard/LeftSide";
import { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(null);

  // multi-step form handler
  const stepDisplay = () => {
    if (step === 0) {
      return (
        <SignupForm
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else {
      return (
        <YourName
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
    }
  };

  return (
    <Grid
      h='100vh'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(12, 1fr)'
      gap={1}
    >
      <GridItem rowSpan={1} colSpan={12} bg='white'>
        {stepDisplay()}
      </GridItem>
    </Grid>
  );
};

export default Register;
