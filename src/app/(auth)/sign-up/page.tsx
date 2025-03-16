'use client'

import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'

const Page = () => {
      const handleSubmit = async (data: { email: string; password: string; }) => {
    console.log('Form data submitted:', data);
    // Return a mock response
    return { success: true };
  };
  return <AuthForm type="SIGN_UP" schema={signUpSchema} defaultValues={{ email: '', password: '', fullName: "", universityId: 0, universityCard: "" }} onSubmit={handleSubmit} />;
};

export default Page;

