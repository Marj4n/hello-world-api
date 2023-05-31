import { Request, Response } from "express"
import { get } from "lodash"

import {
  createLanguage,
  getLanguageById,
  getLanguageByName,
  getLanguages,
  getLanguagesWithLimit,
  updateLanguageById,
} from "../db/languages"
import { Language } from "../types/language"

export const index = async (req: Request, res: Response) => {
  try {
    let languages: Language[] = await getLanguages()
    const { limit } = req.query as { limit: string }
    const { name } = req.query as { name: string }

    if (limit) {
      languages = await getLanguagesWithLimit(Number(limit))
    }

    if (name) {
      const SeacrhLanguages = await getLanguageByName(name)
      if (SeacrhLanguages) {
        languages = [SeacrhLanguages]
      }
    }

    if (languages.length === 0) {
      return res.status(404).json({ message: "No programming languages found" })
    }

    return res.status(200).json(languages)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const language = await getLanguageById(id)

    if (!language) {
      return res.status(404).json({ message: "Programming language not found" })
    }

    return res.status(200).json(language)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { name, description, url, code }: Language = req.body
    const userId = get(req, "identity.user._id") as string
    const languageName = await getLanguageByName(name)

    if (!name || !description || !url || !code) {
      return res.status(400).json({
        message: "Missing required fields",
        required: "name, description, url, code",
      })
    }

    if (languageName) {
      return res
        .status(409)
        .json({ message: "Programming language already exists" })
    }

    const language = await createLanguage({
      name,
      description,
      url,
      code,
      userId,
    })

    return res.status(201).json({
      message: "Programming language successfully added",
      data: language,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, url, code }: Language = req.body
    const language = await getLanguageById(id)
    const userId = get(req, "identity.user._id") as string

    if (!name || !description || !url || !code) {
      return res.status(400).json({
        message: "Missing required fields",
        required: "name, description, url, code",
      })
    }

    if (!language) {
      return res.status(404).json({ message: "Programming language not found" })
    }

    if (userId !== language.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const updatedLanguage = await updateLanguageById(id, {
      name,
      description,
      url,
      code,
      updatedAt: new Date(),
    })

    return res.status(200).json({
      message: "Programming language successfully updated",
      data: updatedLanguage,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const language = await getLanguageById(id)
    const userId = get(req, "identity.user._id") as string
    const deletedLanguage = await getLanguageById(id)

    if (!language) {
      return res.status(404).json({ message: "Programming language not found" })
    }

    if (userId !== language.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    return res.status(200).json({
      message: "Programming language successfully deleted",
      data: deletedLanguage,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}
