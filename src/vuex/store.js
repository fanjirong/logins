const store = new Vuex.Store({
    state:{
        count:0
    },
    mutation:{
        increment(state){
            state.count++
        }
    }
})