import { Client as WorkflowClient } from "@upstash/workflow"
import config from './config'

const workflowClient = new WorkflowClient({
  token: config.env.upstash.qstashToken,
  baseUrl: config.env.upstash.qstashUrl
})

export default workflowClient