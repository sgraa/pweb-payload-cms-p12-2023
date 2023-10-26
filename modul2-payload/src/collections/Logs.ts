import { CollectionConfig } from 'payload/types'

const Logs: CollectionConfig = {
  slug: 'Logs',
  auth: true,
  admin: {
    useAsTitle: 'Logs',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Logs
