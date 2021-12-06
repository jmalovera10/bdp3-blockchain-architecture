import Web3 from "web3"; //Importing Web3 object
import supplyChainArtifact from "../build/contracts/SupplyChain.json"; // Importing the JSON representation of the Smart Contract

const App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: "0x0000000000000000000000000000000000000000",
  sku: 0,
  upc: 0,
  metamaskAccountID: "0x0000000000000000000000000000000000000000",
  ownerID: "0x0000000000000000000000000000000000000000",
  originFarmerID: "0x0000000000000000000000000000000000000000",
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: "0x0000000000000000000000000000000000000000",
  retailerID: "0x0000000000000000000000000000000000000000",
  consumerID: "0x0000000000000000000000000000000000000000",
  meta: null,

  init: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId(); //This method find the network id to retrieve the configuration from truffle-config.js file
      const deployedNetwork = supplyChainArtifact.networks[networkId]; // Retrieve the Network configuration from truffle-config.js file
      this.meta = new web3.eth.Contract(supplyChainArtifact.abi, deployedNetwork.address); // Initializing the contract

      // get accounts
      const accounts = await web3.eth.getAccounts(); // Getting test accounts
      this.metamaskAccountID = accounts[0]; // Assigning a test account
    } catch (error) {
      console.log(error);
      console.error("Could not connect to contract or chain.");
    }
  },

  updateItemInfo: function () {
    App.sku = $("#sku").val();
    App.upc = $("#upc").val();
    App.ownerID = $("#ownerID").val();
    App.originFarmerID = $("#originFarmerID").val();
    App.originFarmName = $("#originFarmName").val();
    App.originFarmInformation = $("#originFarmInformation").val();
    App.originFarmLatitude = $("#originFarmLatitude").val();
    App.originFarmLongitude = $("#originFarmLongitude").val();
    App.productNotes = $("#productNotes").val();
    App.productPrice = $("#productPrice").val();
    App.distributorID = $("#distributorID").val();
    App.retailerID = $("#retailerID").val();
    App.consumerID = $("#consumerID").val();

    console.log(
      App.sku,
      App.upc,
      App.ownerID,
      App.originFarmerID,
      App.originFarmName,
      App.originFarmInformation,
      App.originFarmLatitude,
      App.originFarmLongitude,
      App.productNotes,
      App.productPrice,
      App.distributorID,
      App.retailerID,
      App.consumerID
    );
  },

  harvestItem: async () => {
    App.updateItemInfo();
    const { harvestItem } = App.meta.methods;

    console.log("upc", App.upc);

    const originFarmerID = $("#originFarmerID").val();
    const originFarmName = $("#originFarmName").val();
    const originFarmInformation = $("#originFarmInformation").val();
    const originFarmLatitude = $("#originFarmLatitude").val();
    const originFarmLongitude = $("#originFarmLongitude").val();
    const productNotes = $("#productNotes").val();

    console.log(
      App.upc,
      originFarmerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      productNotes
    );

    const result = await harvestItem(
      App.upc,
      originFarmerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      productNotes
    ).send({ from: App.metamaskAccountID });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("harvestItem", result);
  },

  processItem: async () => {
    App.updateItemInfo();
    const { processItem } = App.meta.methods;

    const result = await processItem(App.upc).send({ from: App.metamaskAccountID });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("processItem", result);
  },

  packItem: async () => {
    App.updateItemInfo();
    const { packItem } = App.meta.methods;

    const result = await packItem(App.upc).send({ from: App.metamaskAccountID });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("packItem", result);
  },

  sellItem: async () => {
    App.updateItemInfo();
    const { sellItem } = App.meta.methods;

    const productPrice = App.web3.utils.toWei("1", "ether");
    console.log("productPrice", productPrice);
    const result = await sellItem(App.upc, productPrice).send({ from: App.metamaskAccountID });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("sellItem", result);
  },

  buyItem: async () => {
    App.updateItemInfo();
    const { buyItem } = App.meta.methods;

    const walletValue = App.web3.utils.toWei("3", "ether");
    const result = await buyItem(App.upc).send({ from: App.metamaskAccountID, value: walletValue });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("buyItem", result);
  },

  shipItem: async () => {
    App.updateItemInfo();
    const { shipItem } = App.meta.methods;

    const result = await shipItem(App.upc).send({ from: App.metamaskAccountID });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("shipItem", result);
  },

  receiveItem: async () => {
    App.updateItemInfo();
    const { receiveItem } = App.meta.methods;

    const result = await receiveItem(App.upc).send({ from: App.metamaskAccountID });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("receiveItem", result);
  },

  purchaseItem: async () => {
    App.updateItemInfo();
    const { purchaseItem } = App.meta.methods;

    const result = await purchaseItem(App.upc).send({ from: App.metamaskAccountID });

    $("#ftc-history").text(JSON.stringify(result));
    console.log("purchaseItem", result);
  },

  fetchItemBufferOne: async () => {
    App.updateItemInfo();
    const { fetchItemBufferOne } = App.meta.methods;

    const result = await fetchItemBufferOne(App.upc).call();
    $("#ftc-item").text(JSON.stringify(result, null, 2));
    console.log("fetchItemBufferOne", result);
  },

  fetchItemBufferTwo: async () => {
    App.updateItemInfo();
    const { fetchItemBufferTwo } = App.meta.methods;

    const result = await fetchItemBufferTwo(App.upc).call();
    $("#ftc-item").text(JSON.stringify(result, null, 2));
    console.log("fetchItemBufferTwo", result);
  },

  fetchEvents: function () {
    if (typeof this.meta.currentProvider.sendAsync !== "function") {
      this.meta.currentProvider.sendAsync = function () {
        return this.meta.currentProvider.send.apply(this.meta.currentProvider, arguments);
      };
    }

    this.meta
      .deployed()
      .then(function (instance) {
        var events = instance.allEvents(function (err, log) {
          if (!err) $("#ftc-events").append("<li>" + log.event + " - " + log.transactionHash + "</li>");
        });
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },
};

window.App = App;

window.addEventListener("load", async function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts from Metamask
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.init();
});
