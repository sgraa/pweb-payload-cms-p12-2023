import { CollectionConfig } from 'payload/types'

const Todo: CollectionConfig = {
  slug: 'Todo',
  auth: true,
  admin: {
    useAsTitle: 'Todo',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Todo
