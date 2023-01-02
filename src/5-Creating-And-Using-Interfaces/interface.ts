export interface Product{
    id: number,
    name: string,
    icon: string,
    description?: string,
    // placeOrder(id: number): boolean
}

//Woahh, the following would not be possible using an interface. 
type ProductAlias = string | {
    id: number,
    name: string,
    icon: string,
    description?: string,
    //placeOrder(id: number): boolean
}

enum ProductType {
    Sporting,
    Home
}

type ProductTypeList = 'SPORTING'|'HOME';
let p: ProductTypeList = 'SPORTING';