import journalApi from "@/api/journalApi"




export const loadEntries = async (context) => {
   // const {commit} = context
   const {data} =  await journalApi.get('/entries.json')

   const entries = []
   if(data){
      for (let field in data) {
         entries.push({
            id: field,
            ...data[field]
         })
         
      }
   }
   

   context.commit('setEntries',entries)
   // console.log(entries)


}

export const updateEntry = async (context , entry) => {
    // const {commit} = context

    const {date,picture,text} = entry
    const dataToSave = { date,text,picture}
    await journalApi.put(`/entries/${entry.id}.json`,dataToSave)
    context.commit('updateEntry',{...entry})
 
 
 }

 export const createEntry = async (context, entry) => {
    // const {commit} = context
    const {date,picture,text} = entry
    const dataToSave = { date,text,picture}
    const {data} = await journalApi.post(`/entries.json`,dataToSave)
    dataToSave.id =data.name
    context.commit('addEntry',dataToSave)
    return data.name
 
 }

 
 export const deleteEntry = async (context, id) => {
   // const {commit} = context
      console.log(id, 'action')
   await journalApi.delete(`/entries/${id}.json`)
   context.commit('deleteEntry',id)

   // return id;

}