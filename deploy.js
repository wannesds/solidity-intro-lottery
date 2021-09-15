const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

//Whoever is reading this, there's no point in stealing this Eth account
//It will ONLY be used for development purposes so you'll only find fake Eth

const provider = new HDWalletProvider(
    'term meadow curious ability combine prize minimum come core dolphin timber cute',
    'https://rinkeby.infura.io/v3/de5933d8420446749237aba293c34e5e'
)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] })

    console.log('Contract deployed to', result.options.address)
}
deploy();