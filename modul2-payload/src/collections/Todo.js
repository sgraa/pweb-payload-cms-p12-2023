/** @type {import('payload/types').CollectionConfig} */
const Todo = {
    slug : "Todo",
    access : {
        read : () => true,
        create : () => true,
        update : () => true,
        delete : () => true,
      },
    admin: {
        useAsTitle: "TodoList"
    },
    fields : [
        {
            name: 'Tugas', 
            type: 'text', 
            required: true, 
        },
        {
            name: 'Deadline',
            type: 'date',
            required: true,
            admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                  displayFormat: 'd MMM yyy',
                },
              },
        },
        {
            name: "Category", 
            type: "relationship",
            relationTo: "Category", 
            hasMany: false, 
          },
        {
            name: 'Status', 
            type: 'radio', 
            required: true,
            options: [
                {
                    label: 'In Progress',
                    value: 'inProgress',
                },
                {
                    label: 'Completed',
                    value: 'completed',
                },
            ],
            defaultValue: 'inProgress', 
            admin: {
                layout: 'horizontal',
            },
        },
    ],
  }
  export default Todo
  
  