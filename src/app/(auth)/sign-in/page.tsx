'use client'

import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validations'

const Page = () => {
    const handleSubmit = async (data: { email: string; password: string; }) => {
    console.log('Form data submitted:', data);
    // Return a mock response
    return { success: true };
  };
  return <AuthForm type="SIGN_IN" schema={signInSchema} defaultValues={{email: '', password: ''}} onSubmit={handleSubmit} />;
};

export default Page;
