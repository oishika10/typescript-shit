import { Product } from './interfaces';

abstract class ProductBase implements Product{
  constructor(public id: number, public name: string, public icon: string) {}
  validate() : boolean {
    throw new Error('Not implemented');
  }
}

export class FoodProduct extends ProductBase{
  //fields/properties
  // id: number = 0;
  // name: string = '';
  // icon: string = '';

  //constructor
  // constructor(public id: number, public name: string, public icon: string) {}
  // {
  //   // this.id = id;
  //   // this.name = name;
  //   // this.icon = icon;
  // }

  //functions
  validate() : boolean {
    return !!this.id && !!this.name && !!this.icon;
  }
}

class SportingGoods extends ProductBase {
  constructor(id: number, name: string, icon: string) {
    super(id, name, icon);
  }
}



let product = new FoodProduct(1, "Pizza slice", "icon.jpg");
