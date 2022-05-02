import { getMany, getOne } from "../services/post"

export const getManyPosts = async (req, res) => {
  try {
    const postList = await getMany()

    res.status(200).json({
      status: 1,
      data: postList
    })
    
    return postList
  } catch (error) {
    throw new Error(error)
  }
}

export const getOnePost = async (id) => {
  try {
    const post = await getOne(id)
    return post
  } catch (error) {
    throw new Error(error)
  }
}