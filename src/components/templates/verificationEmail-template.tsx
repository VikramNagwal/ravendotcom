import * as React from 'react';
import { Html, Button, Head, Heading, Preview } from "@react-email/components";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <Html>
    <Head>
      <title>Verify your Email address</title>
    </Head>
      <Preview>
        hello from team raven
        Please verify your email address by clicking the button below.
      </Preview>
      <Heading>
        Verify your email address
      </Heading>
      <Button href="https://ravendotcom.online/verify-email">
        Verify Email
      </Button>
  </Html>
);
