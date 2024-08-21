// types.ts
export interface Order {
    _id: string;
    status: string;
    amount: number;
    createdAt: string;
  }
  
  export interface Product {
    _id: string;
    name: string;
    price: number;
    createdAt: string;
  }
  
  export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
  }
  