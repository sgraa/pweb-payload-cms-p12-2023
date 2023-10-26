import { CollectionConfig } from 'payload/types'

const Catagory: CollectionConfig = {
  slug: 'Catagory',
  auth: true,
  admin: {
    useAsTitle: 'Catagory',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Catagory
