const json_example = [
    {
       "id": 1,
       "name": "Johnson, Smith, and Jones Co.",
       "amount": 345.33,
       "comment": "Pays on time"
    },
    {
       "id": 2,
       "name": "Sam Mad Dog Smith",
       "amount": 993.44,
       "comment": ""
    },
    {
       "id": 4,
       "name": "Johnson's Automotive",
       "amount": 2344,
       "comment": ""
    }
]

export default JSON.stringify(json_example, undefined, 2);