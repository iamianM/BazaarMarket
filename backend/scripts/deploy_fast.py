from brownie import accounts
from scripts.helpers import *


is_testnet = network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS
diffemon, account = deploy_contracts(accounts, use_previous=False, publish=not is_testnet, testnet=is_testnet)

if is_testnet:
    tx = diffemon.buyBooster(account.address, {"from": account})
    tx = diffemon.buyBooster(accounts[2].address, {"from": account})
    tx = diffemon.buyBooster(accounts[3].address, {"from": account})
    tx = diffemon.buyBooster({"from": accounts[3], "value": diffemon.getBoosterPrice()})
    tx = diffemon.buyBooster({"from": accounts[4], "value": diffemon.getBoosterPrice()})

    tx = diffemon.grantRole(diffemon.DEFAULT_ADMIN_ROLE.call(), accounts[5].address, {"from": account})
    tx = diffemon.buyBooster(accounts[6].address, {"from": accounts[5]})

def main():
    pass
