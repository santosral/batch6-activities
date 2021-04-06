const modal = document.getElementById("create_user_modal");
const btn = document.getElementById("create_user_btn");
const span = document.querySelector(".close");

const depositModal = document.getElementById("deposit_modal");
const depositBtn = document.getElementById("deposit_btn");
const closeSpan = document.getElementById("depositClose");

const withdrawModal = document.getElementById("withdraw_modal");
const withdrawBtn = document.getElementById("withdraw_btn");
const withdrawCloseSpan = document.getElementById("withdrawClose");

const transferModal = document.getElementById("transfer_modal");
const transferBtn = document.getElementById("transfer_btn");
const transferCloseSpan = document.getElementById("transferClose");

let users = [];
let tbody = document.getElementById("tbody");

let depositForm = document.getElementById("deposit");
depositForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let withdrawForm = document.getElementById("withdraw");
withdrawForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

let transferForm = document.getElementById("transfer");
transferForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Event Listeners
btn.addEventListener("click", function () {
  modal.style.display = "block";
  acctNo = generateNo();
  document.getElementById("acctNo").innerHTML = acctNo;
});

span.addEventListener("click", function () {
  modal.style.display = "none";
});

depositBtn.addEventListener("click", function () {
  depositModal.style.display = "block";
});

closeSpan.addEventListener("click", function () {
  depositModal.style.display = "none";
});

withdrawBtn.addEventListener("click", function () {
  withdrawModal.style.display = "block";
});

withdrawCloseSpan.addEventListener("click", function () {
  withdrawModal.style.display = "none";
});

transferBtn.addEventListener("click", function () {
  transferModal.style.display = "block";
});

transferCloseSpan.addEventListener("click", function () {
  transferModal.style.display = "none";
});

// Generating Account Number
function generateNo() {
  let num = Math.floor(10000000 + Math.random() * 9000000);
  let acctNo = "1094" + num;
  return acctNo;
}

function submitBtn() {
  let lastName = document.getElementById("lastName").value;
  let firstName = document.getElementById("firstName").value;
  let balance = document.getElementById("balance").value;

  if (lastName == "") {
    alert("Last name must be filled out");
  } else if (firstName == "") {
    alert("First name must be filled out");
  }
  else if (balance <= -1) {
    alert("Unable to process negative value");
  } else {
    let user = lastName + ", " + firstName;
    create_user(user, balance);
    modal.style.display = "none";
    return user && balance;
  }
}

function create_user(user, balance) {
  tr = tbody.insertRow();
  let td1 = tr.insertCell();
  let td2 = tr.insertCell();
  let td3 = tr.insertCell();
  let td4 = tr.insertCell();

  str = user;
  username = str.split(", ");

  td1.innerHTML = acctNo;
  td2.innerHTML = username[0];
  td3.innerHTML = username[1];
  td4.innerHTML = balance;
  users.push({
    acctNo,
    user,
    balance,
  });
  return users;
}

function list_users() {
  let loadUsers = [];

  let str1 = localStorage.getItem(1);
  let user1 = JSON.parse(str1);
  loadUsers.push(user1);

  let str2 = localStorage.getItem(2);
  let user2 = JSON.parse(str2);
  loadUsers.push(user2);

  for (let i = 0; i < loadUsers.length; i++) {
    tr = tbody.insertRow();
    td1 = tr.insertCell();
    td1.innerHTML = loadUsers[i].acctNo;

    str = loadUsers[i].user;
    username = str.split(", ");

    td2 = tr.insertCell();
    td2.innerHTML = username[0];
    td3 = tr.insertCell();
    td3.innerHTML = username[1];
    td3 = tr.insertCell();
    td3.innerHTML = loadUsers[i].balance;
  }
}

function depositButton() {
  let accountNumber = document.getElementById("depositAcctNo").value;
  let depositLastName = document.getElementById("depositLastName").value;
  let depositFirstName = document.getElementById("depositFirstName").value;
  let amount = document.getElementById("depositAmount").value;

  if (accountNumber == "") {
    alert("Account Number must be filled out");
  } else if (depositLastName == "") {
    alert("Last name must be filled out");
  }
  else if (depositFirstName == "") {
    alert("First name must be filled out");
  }
  else if (amount <= -1) {
    alert("Unable to deposit");
  } else {
    let user = depositLastName + ", " + depositFirstName;
    depositModal.style.display = "none";
    deposit(accountNumber, amount);
    return accountNumber && user && amount;
  }
}

function deposit(accountNumber, amount) {
  let newAmount = parseInt(amount, 10);
  var table, tr, td, i, txtValue;
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.indexOf(accountNumber) > -1) {
        let toNumber = parseInt(txtValue2, 10);
        let newBalance = toNumber + newAmount;
        newBalance.toString();
        td2.textContent = newBalance;
        return td2;
      }
    }
  }
}

function withdrawButton() {
  let withdrawAccountNumber = document.getElementById("withdrawAcctNo").value;
  let withdrawLastName = document.getElementById("withdrawLastName").value;
  let withdrawFirstName = document.getElementById("withdrawFirstName").value;
  let withdrawAmount = document.getElementById("withdrawAmount").value;

  if (withdrawAccountNumber == "") {
    alert("Account Number must be filled out");
  } else if (withdrawLastName == "") {
    alert("Last name must be filled out");
  }
  else if (withdrawFirstName == "") {
    alert("First name must be filled out");
  }
  else if (withdrawAmount <= -1) {
    alert("Unable to withdraw");
  } else {
    let user = withdrawLastName + ", " + withdrawFirstName;
    withdrawModal.style.display = "none";
    withdraw(withdrawAccountNumber, withdrawAmount);
    return withdrawAccountNumber && user && withdrawAmount;
  }
}

function withdraw(withdrawAccountNumber, withdrawAmount) {
  let newAmount = parseInt(withdrawAmount, 10);
  var table, tr, td, i, txtValue;
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.indexOf(withdrawAccountNumber) > -1) {
        let toNumber = parseInt(txtValue2, 10);
        let withdrawBalance = toNumber - newAmount;
        withdrawBalance.toString();
        td2.textContent = withdrawBalance;
        return td2;
      }
    }
  }
}

function transferButton() {
  let senderAccountNumber = document.getElementById("senderAcctNo").value;
  let senderLastName = document.getElementById("senderLastName").value;
  let senderFirstName = document.getElementById("senderFirstName").value;
  let transferAmount = document.getElementById("transferAmount").value;
  let senderUser = senderLastName + ", " + senderFirstName;

  let receiverAccountNumber = document.getElementById("receiverAcctNo").value;
  let receiverLastName = document.getElementById("receiverLastName").value;
  let receiverFirstName = document.getElementById("receiverFirstName").value;
  let receiverUser = receiverLastName + ", " + receiverFirstName;

  if (senderAccountNumber == "" || receiverAccountNumber == "") {
    alert("Account Number must be filled out");
  } else if (senderLastName == "" || receiverLastName == "") {
    alert("Last name must be filled out");
  }
  else if (senderFirstName == "" || receiverFirstName == "") {
    alert("First name must be filled out");
  }
  else if (transferAmount <= -1) {
    alert("Unable to transfer");
  } else {
    transferModal.style.display = "none";
  transfer(senderAccountNumber, transferAmount);
  receiver (receiverAccountNumber, transferAmount);
  return (
    senderAccountNumber &&
    senderUser &&
    transferAmount &&
    receiverAccountNumber &&
    receiverUser
  );
  }
}

function transfer(senderAccountNumber, transferAmount) {
  let transferToNum = parseInt(transferAmount, 10);
  var table, tr, td, i, txtValue;
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.indexOf(senderAccountNumber) > -1) {
        let toNumber = parseInt(txtValue2, 10);
        let newSenderBalance = toNumber - transferToNum;
        newSenderBalance.toString();
        td2.textContent = newSenderBalance;
        return td2;
      }
    }
  }
};

function receiver (receiverAccountNumber, transferAmount) {
  let transferToNum = parseInt(transferAmount, 10);
  var table, tr, td, i, txtValue;
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.indexOf(receiverAccountNumber) > -1) {
        let toNumber = parseInt(txtValue2, 10);
        let newSenderBalance = toNumber + transferToNum;
        newSenderBalance.toString();
        td2.textContent = newSenderBalance;
        return td2;
      }
    }
  }
}

// Local Storage
let user1 = {};
user1.acctNo = 109415003732;
user1.user = "Cruz, Juan";
user1.balance = 50000;

let user2 = {};
user2.acctNo = 109411288050;
user2.user = "Roxas, Pedro";
user2.balance = 100000;

localStorage.setItem(1, JSON.stringify(user1));
localStorage.setItem(2, JSON.stringify(user2));
