from brownie import accounts
from scripts.helpers import *
import os


is_testnet = network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS
diffemon, account = deploy_contracts(accounts, use_previous=False, publish=not is_testnet, testnet=is_testnet)

tx = diffemon.allotBoosters(account.address, 10, {"from": account})
tx = diffemon.buyBooster({"from": account})
tx = diffemon.grantRole(diffemon.DEFAULT_ADMIN_ROLE.call(), os.environ.get('PAOLO_WALLET'), {"from": account})
tx = diffemon.allotBoosters(os.environ.get('PAOLO_WALLET'), 10, {"from": account})

if is_testnet:
    tx = diffemon.allotBoosters(account.address, 10, {"from": account})
    tx = diffemon.buyBooster({"from": account})
    tx = diffemon.buyBooster({"from": account})
    tx = diffemon.buyBooster({"from": account})
    tx = diffemon.allotBoosters(accounts[3], 1, {"from": account})
    tx = diffemon.buyBooster({"from": accounts[3]})
    tx = diffemon.allotBoosters(accounts[4], 1, {"from": account})
    tx = diffemon.buyBooster({"from": accounts[4]})
    try: 
        tx = diffemon.buyBooster({"from": accounts[4]})
    except:
        print("Successfully failed to buy too many packs")
    try: 
        tx = diffemon.buyBooster({"from": accounts[5]})
    except:
        print("Successfully failed to buy too many packs")

    tx = diffemon.grantRole(diffemon.DEFAULT_ADMIN_ROLE.call(), accounts[5].address, {"from": account})
    tx = diffemon.allotBoosters(accounts[5].address, 10, {"from": accounts[5]})
    tx = diffemon.buyBooster({"from": accounts[5]})

def main():
    pass
