const store = {
    store: "Techno Lib",
    inventoryList: new Array(),
    earnings: 0,
}

let book = {
    title: "Learning Javascript",
    quantity: 0,
    value: 1000,
}
store.inventoryList.push(book);


function addBook() {
    let newBook = Object.create(book);
    newBook.title = "Web Development";
    newBook.quantity = 100;
    newBook.value = 1500;

    store.inventoryList.push(newBook);
    console.log(store.inventoryList);
    return store.inventoryList;
}
addBook()

let title = "Learning Javascript";
let quantity = 200;

function restockBook(title, quantity) {
    if (store.inventoryList.some(book => book.title === title)) {
        book.quantity += quantity;
    } else {
        console.log(`${title} is included in your inventory`);
    }
    console.log(store.inventoryList);
    return store.inventoryList;
}
restockBook(title, quantity);

function sellBook(title, quantity) {
    let findBook = store.inventoryList.find(book => book.title === title);
    let findBook2 = store.inventoryList.find(newBook => newBook.title);

    if (findBook) {
        findBook.quantity -= 1;
        store.earnings += findBook.value;
        console.log(`Successful Transaction`);
        return store.earnings;
        } else if (title !== findBook1 && findBook2) {
            console.log(`${findBook} is out of stock`);
        } else if (findBook.quantity < quantity) { 
            console.log(`only ${findBook.quantity} stocks left`)
        }
        console.log(store.inventoryList);
        return store.inventoryList;
}

sellBook(title, quantity);

function totalEarnings() {
    console.log(`${store.store} total earnings is ${store.earnings}`)
}
totalEarnings();

function listInventory() {
    let findBook = store.inventoryList.find(book => book.title === title);

    console.log(`Title: ${findBook.title} \nQuantity: ${findBook.quantity} \nValue: ${findBook.value}`);
    console.log(`Title: ${store.inventoryList[1].title} \nQuantity: ${store.inventoryList[1].quantity} \nValue: ${store.inventoryList[1].value}`);
}
listInventory()