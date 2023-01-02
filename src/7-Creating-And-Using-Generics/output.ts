import { productsURL, FoodProduct, customersURL } from '../lib';

const prefix = '🐉 ';

interface HasId {
  id: number;
}

class GenericModel<T extends HasId> {
  public items: T[] | undefined;
  constructor(public url: string) {}

  async getItems(): Promise<T[]> {
    this.items = await getList<T>(this.url);
    return this.items;
  }

  getItemById(id: number): T | undefined {
    return this.items ? this.items.find((p) => (id === p.id)) : undefined;
  }
}

const foodModel = new GenericModel<FoodProduct>(productsURL);

export default async function updateOutput(id: string = 'output') {
  const products = await getProducts();
  // const products = await getList<FoodProduct>(productsURL);
  // const products = await foodModel.getItems();

  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);

  if (output && html) {
    output.innerHTML = html;
  }
}

function layoutProducts(products: FoodProduct[]): string {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
    <span class="card-id">#${id}</span>
      <i class="card-icon ${icon} fa-lg"></i>
    <span class="card-name">${name}</span>
    `;
    const cardHtml = `
    <li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}
//We are using a generic here. Look at the angle brackets. 
async function getProducts(): Promise<FoodProduct[]> {
  const response: Response = await fetch(productsURL);
  const products: FoodProduct[] = await response.json();
  return products;
}

async function getList<T>(url: string): Promise<T[]> {
  const response: Response = await fetch(url);
  const items: T[] = await response.json();
  return items;
}

/************************************************
 * Learning sample code.
 ***********************************************/

runTheLearningSamples();

async function runTheLearningSamples() {
  function whatIsIt_number(arg: number){
    return arg;
  }
  function whatIsIt_string(arg: string){
    return arg;
  }
  function whatIsIt_any(arg: any){
    return arg;
  }

  console.log(`${prefix} Generics Overview`);
  console.log(whatIsIt_number(11));
  console.log(whatIsIt_string("john"));
  console.log(whatIsIt_any("john"));

  function whatIsIt_typed<T>(arg: T): T{
    return arg;
  }

  let n: number = whatIsIt_typed<number>(11);
  let s: string = whatIsIt_typed<string>("john");
  let b: boolean = whatIsIt_typed<boolean>(true);
  console.log(n, s, b);

  interface Customer{
    id: number; 
    name: string;
  }

  async function getData() {
    const products = await getList<FoodProduct>(productsURL);
    console.table(products);
    const costumers = await getList<Customer>(customersURL);
    console.table(costumers);
  }

  await getData();
  interface Model<T>{
    items: T[] | undefined;
    getItems: () => Promise<T[]>;
    getItemsById: (id: number) => T | undefined;
  }

  class FoodModel implements Model<FoodProduct>{
    public items: FoodProduct[] | undefined;

    async getItems(): Promise<FoodProduct[]> {
      this.items = await getList<FoodProduct>(productsURL);
      return this.items;
    }

    getItemsById(id: number): FoodProduct | undefined {
      return this.items ? this.items.find((item) => (id = item.id)) : undefined;
    }
  }
}
