import { Document } from "mongoose"

export interface Language extends Document {
  _id: string
  name: string
  description: string
  url: string
  code: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
