export const useUserStore=defineStore('user',{
    state:()=>({
        user:null
    }),
    actions:{
        //set value of user
        updateUser(value){
            this.user=value
        }
    },
    getters:{
        getUser:(state)=>state.user,
    }
})
