import { Resend } from "resend";
import { EmailTemplate } from '@/components/templates/verificationEmail-template';
import { NextResponse } from "next/server";


const resend = new Resend(process.env.RESEND_API_KEY);

export const emailSender = async (email: string, username: string) => {

     try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_SERVICE_DOMAIN_NAME!,
      to: email,
      subject: 'Email Verification',
      react: EmailTemplate({ firstName: username }),
      text: 'This is the text content of the email.',
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}