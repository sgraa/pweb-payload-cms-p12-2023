/** @type {import('payload/types').CollectionConfig} */

const Category = {
  slug: 'Category',
  access : {
    read : () => true,
    create : () => true,
    update : () => true,
    delete : () => true,
  },
  fields: [
    {
        name: 'Kategori', 
        type: 'text', 
        required: true, 
    },
  ],
}

export default Category
