'use server'

import { db } from '../../../../database/drizzle'
import { books } from '../../../../database/schema'



export const createBooks = async (params: BookParams) => {

  try {
    const newBook = await db.insert(books).values({
      ...params,
      availableCopies: params.totalCopies,
    }).returning()
    return {
      success: true,
      data: newBook[0]
    }
  } catch (error) {
    console.log('Error:', error)

    return {
      success: false,
      message: 'An error occurred while creating the book',
    }
  }
}

