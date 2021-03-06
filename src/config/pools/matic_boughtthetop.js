import {
  init_ethers,
  _print,
  formatMoney,
  _print_bold,
  hideLoading,
} from "./ethers_helper";
import {
} from "../BCData";
import {
    getMaticPrices,
    loadMaticSynthetixPoolInfo,
    loadMultipleMaticSynthetixPools,
} from "./matic_helpers";


const BTT_STAKING_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_admin", "internalType": "address" }, { "type": "address", "name": "_rewardDistribution", "internalType": "address" }, { "type": "address", "name": "_rewardToken", "internalType": "address" }, { "type": "address", "name": "_stakingToken", "internalType": "address" }] }, { "type": "event", "name": "Recovered", "inputs": [{ "type": "address", "name": "token", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RewardAdded", "inputs": [{ "type": "uint256", "name": "reward", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RewardPaid", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "reward", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RoleAdminChanged", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32", "indexed": true }, { "type": "bytes32", "name": "previousAdminRole", "internalType": "bytes32", "indexed": true }, { "type": "bytes32", "name": "newAdminRole", "internalType": "bytes32", "indexed": true }], "anonymous": false }, { "type": "event", "name": "RoleGranted", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32", "indexed": true }, { "type": "address", "name": "account", "internalType": "address", "indexed": true }, { "type": "address", "name": "sender", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "RoleRevoked", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32", "indexed": true }, { "type": "address", "name": "account", "internalType": "address", "indexed": true }, { "type": "address", "name": "sender", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Staked", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawn", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DEFAULT_ADMIN_ROLE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DISTRIBUTION_ASSIGNER_ROLE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "DURATION", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "RECOVER_ROLE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "earned", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "exit", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "getReward", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getRewardForDuration", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "getRoleAdmin", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "getRoleMember", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "uint256", "name": "index", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getRoleMemberCount", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "grantRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "hasRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "lastTimeRewardApplicable", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "lastUpdateTime", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "maximumContribution", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "notifyRewardAmount", "inputs": [{ "type": "uint256", "name": "reward", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "periodFinish", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "recoverERC20", "inputs": [{ "type": "address", "name": "tokenAddress", "internalType": "address" }, { "type": "uint256", "name": "tokenAmount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "renounceRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "revokeRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "rewardDistribution", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "rewardPerToken", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "rewardPerTokenStored", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "rewardRate", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract IERC20" }], "name": "rewardToken", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "rewards", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setRewardDistribution", "inputs": [{ "type": "address", "name": "_rewardDistribution", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "stake", "inputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "contract IERC20" }], "name": "stakeToken", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "userRewardPerTokenPaid", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }] }]

const Addresses = [
  "0x32b753c75C4b270730c10Bb3FC2859f8f9a207e4",
  "0x78e4c2809DC44457Ce3e1803D64d73879f4A6985",
  "0x922538955B4DD2dAf7f038FdFE7fD5353DD70399",
  "0x31e0a45b1BCb62604455F90142340921072c07F0",
  "0x58f9b9d6d0215512f88E2180d92a38C039867344",
  "0x1E507B29af0510fCDC45eaeE71A9C96682ca7feD",
  "0x2F164570Dc13969C9902A14F4D206D582f9baA39"
]

export async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const pools = Addresses.map(a => {
    return {
      address: a,
      abi: BTT_STAKING_ABI,
      stakeTokenFunction: "stakeToken",
      rewardTokenFunction: "rewardToken"
    }
  })

  await loadMaticSynthetixPoolInfo(App, tokens, prices, pools[0].abi, pools[0].address,
    pools[0].rewardTokenFunction, pools[0].stakeTokenFunction)

  let p = await loadMultipleMaticSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}
