'use server'

import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '../../../database/drizzle'
import { users } from '../../../database/schema'
import { signIn } from '../auth'
import config from '../config'
import ratelimit from '../ratelimit'
import { workflowClient } from '../workflows'

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
  const { email, password } = params

  const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  if (!success) return redirect("/too-fast")

  try {
    const result = await signIn('credentials', { email, password, redirect: false })

    if (result?.error) return { success: false, error: result.error }

    return { success: true }
  }
  catch (error) {
    console.log(error, 'Signin error')
    return { success: false, error: 'Signin error' }
  }
}

export const signUp = async (params: AuthCredentials) => {
  const { email, fullName, password, universityCard, universityId } = params

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) return redirect("/too-fast")

  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)

  if (existingUser.length > 0) {
    return { succes: false, error: "User already exists" }
  }

  const hashPassword = await hash(password, 10)

  try {
    await db.insert(users).values({ email, fullName, password: hashPassword, universityCard, universityId })

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onbording`,
      body: { email, fullName }
    })

    return { success: true }
  } catch (error) {
    console.log(error, "Signup error")
    return { success: false, error: 'Signup error' }
  }
}