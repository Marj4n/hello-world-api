import { Language } from "@/types/language"
import { Model, Schema, model } from "mongoose"

const languageSchema: Schema<Language> = new Schema<Language>({
  _id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  code: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const LanguageModel: Model<Language> = model<Language>(
  "Language",
  languageSchema
)

export const getLanguages = (): Promise<Language[]> => LanguageModel.find()

export const getLanguagesWithLimit = (limit: number): Promise<Language[]> =>
  LanguageModel.find().limit(limit)

export const getLanguageById = (id: string): Promise<Language | null> =>
  LanguageModel.findById(id)

export const getLanguageByName = (name: string): Promise<Language | null> =>
  LanguageModel.findOne({ name: { $regex: new RegExp(name, "i") } })

export const createLanguage = async (
  values: Partial<Language>
): Promise<Language> => {
  const languageCount = await LanguageModel.countDocuments({})
  const newLanguage = new LanguageModel({
    _id: String(languageCount + 1),
    ...values,
  })
  return newLanguage.save().then((language) => language.toObject())
}

export const updateLanguageById = (
  id: string,
  values: Partial<Language>
): Promise<Language | null> =>
  LanguageModel.findByIdAndUpdate(id, values, { new: true })

export const deleteLanguageById = (id: string): Promise<void> =>
  LanguageModel.findByIdAndDelete(id)
