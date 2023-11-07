

// export const  mutation = (/*state*/) => {

// }
export const  setEntries = (state , entries) => {

    state.entries = [...state.entries, ...entries]
    state.isLoading =  false
}
export const  updateEntry = (state , entry) => {

    for (let e in state.entries) {
        if(entry.id === state.entries[e].id){
            state.entries[e] = entry
        }
        
    }

}
export const  addEntry = (state, entry) => {
    state.entries.push(entry) 
}

//deleteEntry

export const  deleteEntry = (state, id) => {
    const entries =   state.entries
    state.entries  =  entries.filter(entry => entry.id !== id)
}