export const useLocationStore=defineStore('location',{
    state:()=>({
      location:{
        lat:24.7136,
        lng:46.6753,
      }
        }),
    actions:{
        //set value of location
        updateLocation(lat,lng){
            this.location.lat=lat
            this.location.lng=lng
        }
    },
    getters:{
        getLocation:(state)=>state.location,
    }
})
