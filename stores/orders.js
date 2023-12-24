// import { useOrdersStore } from '@/stores/orders';


export const useOrdersStore=defineStore('Orders',{
    state:()=>({
        orders:[
       {
        id:null,
        delivery_status:null,
        purchase_date:null,
        products:[
            {
                name:null,
                quantity:null,
                image:null
            }
        ]
       }
    ]
        }),
    actions:{
setOrders(newOrders) {
    this.orders= newOrders;
  }
    },
    getters:{
        getOrders:(state)=>state.orders,
    }
})
