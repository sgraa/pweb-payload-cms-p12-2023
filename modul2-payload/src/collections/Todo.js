import payload from 'payload';
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
        useAsTitle: "Todo"
    },
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == "create") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "todo",
                            action : "create",
                            timestamp: new Date()
                        },
                    });
                } else if (args.operation == "update") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "todo",
                            action : "update",
                            timestamp: new Date()
                        },
                    });
                } else if (args.operation == "delete") {
                    payload.create({
                        collection: "Log",
                        data: {
                            collectionName: "todo",
                            action : "delete",
                            timestamp: new Date()
                        },
                    });
                } 
            },
        ],
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
  
  