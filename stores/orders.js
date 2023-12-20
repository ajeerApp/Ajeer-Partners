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
        //set value of order
//         updateOrders(){
//             const authStore = useAuth();
//             const authOrders = authStore.orders;

//             if(authOrders){
//             // Clear current orders
//              this.orders = [];

//             }
//            console.log("authStore.orders()",authOrders)
//            this.orders=authOrders;
//             // for(let i=0;i<orders.lenght;i++){
//             //     this.orders[i].id=orders[i].id
//             //     this.orders[i].delivery_status=orders[i].delivery_status
//             //     this.orders[i].purchase_date=orders[i].id
//             //     for(let j=0;j<orders.products.lenght;j++){
//             //         this.orders[i].products[j].name=orders.products[i].name
//             //         this.orders[i].products[j].quantity=orders.products[i].quantity
//             //         this.orders[i].products[j].image=orders.products[i].image
//             //       }
//             //   }
          
// console.log("orders",this.orders)
//         }
setOrders(newOrders) {
    this.orders= newOrders;
  }
    },
    getters:{
        getOrders:(state)=>state.orders,
    }
})
