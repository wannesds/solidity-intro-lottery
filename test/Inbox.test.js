const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //capital W because constructor func
const web3 = new Web3(ganache.provider()); //small w bceause instance

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

describe('Car', () => {
    it('can park', () => {

    });
});
