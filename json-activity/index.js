const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-goerli.g.alchemy.com/v2/JR3cdeyYsiv53iFd0HTKT0gyDhlTW2sr";

// axios.post(ALCHEMY_URL, {
//     jsonrpc: "2.0",
//     id: 1,
//     method: "eth_getBlockByNumber",
//     params: [
//         "0xb443", // block 46147
//         true  // retrieve the full transaction object in transactions array
//     ]
// }).then((response) => {
//     console.log(response.data.result);
// });

axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [
        "0xe5cB067E90D5Cd1F8052B83562Ae670bA4A211a8", // wallet address
        "latest"
    ]
}).then((response) => {
    console.log(response.data.result);
});
