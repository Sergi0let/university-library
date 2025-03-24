import { Client as QstashClient, resend } from "@upstash/qstash"
import { Client as WorkflowClient } from "@upstash/workflow"
import config from './config'


export const workflowClient = new WorkflowClient({
  token: config.env.upstash.qstashToken,
  baseUrl: config.env.upstash.qstashUrl
})

const qstashClient = new QstashClient({ token: config.env.upstash.qstashToken })

export const sendEmail = async ({ email, subject, message }: { email: string, subject: string, message: string }) => {

  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Sergij Vash <hello.vashkevych.com>",
      to: [email],
      subject,
      html: message,
    },
  })
}