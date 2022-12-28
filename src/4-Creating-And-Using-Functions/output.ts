import { productsURL } from "../lib";

const prefix = '🐉 ';

type ProductType = {
  id: number;
  name: string;
  //Question mark means that the icon is optional
  icon?: string;
}
export default async function updateOutput(id: string){
  const products = await getProducts();
  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);

  if(output && html){
    output.innerHTML = html;
  }
}

async function getProducts(): Promise<ProductType[]>{
  const response: Response = await fetch(productsURL);
  const products: ProductType[] = await response.json();
  return products;
}

function layoutProducts( products: ProductType[]) {
  const items = products.map((product) => {
    const { id, name, icon } = product;
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

// run our samples
runTheLearningSamples();

function runTheLearningSamples(){
  //hoisted
  function displayProductInfo(id: number, name: string){
    console.log(`${prefix} typed parameters`);
    console.log(`productId = ${id} and product name = ${name}`);
  }
  displayProductInfo(10, "Pizza");

  console.log(`${prefix} function declaration`);
  console.log(addNumbersDeclaration(7,11));
  function addNumbersDeclaration(x: number, y: number): number{
    const sum: number = x + y;
    return sum;
  }
  //This won't work because expressiions are not hoisted.  
  //console.log(`${prefix} function expression`);
  // console.log(addNumbersExpression(7,11));

  const addNumbersExpression = function(x : number, y : number): number{
    const sum : number = x + y;
    return sum;
  }
  console.log(`${prefix} function expression`);
  console.log(addNumbersExpression(7,11));

  const sampleProducts: ProductType[] = [
    {
      id:10,
      name: "Pizza slice",
      icon: "fas fa-pizza slide",
    },
    {
      id:20,
      name: "Ice Cream",
      icon: "fas fa-ice cream",
    },
    {
      id:30,
      name: "Cheese",
      icon: "fas fa-cheese",
    }
  ];

  function getProductNames(): string[]{
    return sampleProducts.map((p) => p.name);
  }
  console.log(`${prefix} return array`);
  console.log(getProductNames());

  function getProductById(id: number): ProductType | undefined{
    return sampleProducts.find(p => id == p.id);
    /*
    return sampleProducts.find(function (p){
      return id == p.id;
    })
    return sampleProducts.find((p) => {id ==p.id})
    */
  }

  //We could define the function in this way, and assign the function to a variable. 
  const getProductById2 = function (id: number) : ProductType | undefined {
    return sampleProducts.find(p => id == p.id);
  };

  //We can use this as an arrow function, and remove the function keyword
  const getProductById3 =  (id: number) : ProductType | undefined => {
    return sampleProducts.find(p => id == p.id);
  };

  //Additionally since the body of the function is just one line, we can remove the curly braces
  const getProductById4 =  (id: number) : ProductType | undefined => sampleProducts.find(p => id == p.id);
  
  console.log(`${prefix} return product type`);
  console.log(getProductById(10));

  function displayProducts(products: ProductType[]) : void{
    const productNames: string[] = products.map(p => {
      const name = p.name.toLowerCase();
      return name;
    });
    /*
    Can also write it as:
    products.map(function (p) {
      const name = p.name.toLowerCase();
      return name;
    })
    */
    const msg = `Sample products include: ${productNames.join(', ')}`;
    console.log(`${prefix} return void`);
  console.log(msg);
  }
  console.log(`${prefix} displayProducts`);
  console.log(displayProducts(sampleProducts));

  /*Here, we are destructuring our parameters. */
  const {floor, random} = Math;
  const getRandomInt = (max: number = 1000) => floor(random() * max);
  /*Could also write it as:
  const getRandomInt = function(max: number) : number {
    return Math.floor(Math.random() * max);
  }
  */
  function createProduct(name: string, icon?: string): ProductType{
    const id = getRandomInt(1000);
    return {
      id, name, icon
    }
  }
  console.log(`${prefix} Optional paramaters`);
  let pineapple: ProductType = createProduct("pineapple", "pineappple.jpg");
  let mango: ProductType = createProduct("mango");
  console.log(pineapple, mango);

  function createProductWithDefaults(
    name: string, 
    icon: string = "generic-fruit.jpg"
  ): ProductType{
    const id = getRandomInt();
    return {
      id, name, icon
    }
  }
  console.log(`${prefix} Optional paramaters`);
  pineapple = createProductWithDefaults("pineapple", "pineappple.jpg");
  mango = createProductWithDefaults("mango");
  console.log(pineapple, mango);

  function buildAddress(street: string, city: string, ...restOfAddress: string[]){
    const address = `${street} ${city} ${restOfAddress.join(', ')}`;
    console.table(restOfAddress);
    return address;
  }
  const someAddress = buildAddress(
    "171West Julian Street", //street
    "San Jose", //city
    "California", //restOfAddress [0]
    "95110", //restOfAddress [1]
    "United States" //restOfAddress [2]
    ); 
  console.log(someAddress);

  function displayProduct({id, name, icon}: ProductType): void{
    console.log(`${prefix} Destructuring paramaters`);
    // console.log(`Product ID: ${product.id}, and Product Name: ${product.name}`);
    console.log(`Product ID: ${id}, and Product Name: ${name}`);
  }
  const prod = getProductById(10);
  if (prod){
    displayProduct(prod);
  }
}