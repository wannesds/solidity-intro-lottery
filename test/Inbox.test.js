const assert = require('assert') //part of node lib, to make sure that 1 value = 1 other value
const ganache = require('ganache-cli')
const Web3 = require('web3') //capital W because constructor func
const web3 = new Web3(ganache.provider()) //small w bceause instance
const { interface, bytecode } = require('../compile')

const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts()

    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, INITIAL_STRING);

        
    })
    
    it('chan change the message', async () => {
        await inbox.methods.setMessage('bye!').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'bye!')
    })
})
