export default interface Order {
    userId: string;
    products: { 
        productId: number; 
        quantity: number 
    }[];
}

export default interface Status {
    status: string;
}