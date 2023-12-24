// import { useOrdersStore } from '@/stores/orders';

export const useOrdersStore=defineStore('Orders',{
    state:()=>({
        orders:JSON.parse(localStorage.getItem("orders") || '[]'),
        }),
    actions:{
   setOrders(newOrders) {
    this.orders= newOrders;
    localStorage.setItem("orders",JSON.stringify(newOrders))
  }
    },
    getters:{
        getOrders: (state) => state.orders,
        // initializeDataFromStorage(){
        //    state= JSON.parse(localStorage.getItem("orders"))
        // }
    }
})
