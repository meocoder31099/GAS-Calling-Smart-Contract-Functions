# GAS-Calling-Smart-Contract-Functions
Minimum code required to call smart contract functions in Google App Script.
# Demo
```js
const main = () => {
  const jsonRpcProvider = 'https://arb1.arbitrum.io/rpc';
  const gUSDCAddress = '0xd3443ee1e91aF28e5FB858Fbd0D72A63bA8046E0';
  const gETHAddress = '0x5977A9682D7AF81D347CFc338c61692163a2784C';
  const gDAIAddress = '0xd85E038593d7A098614721EaE955EC2022B9B91B';
  const ABI = [
    {
      inputs: [],
      name: 'shareToAssetsPrice',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const gUSDC = new SmartContract({
    jsonRpcProvider,
    abi: ABI,
    contractAddress: gUSDCAddress
  })
  const gUSDCPrice = gUSDC.call({
    methodName: 'shareToAssetsPrice',
    paramsValue: []
  })
  Logger.log('gUSDC: ' + parseFloat(Number(Number(gUSDCPrice[0].toBigInt()) / 1e18).toFixed(5)));


  const gETH = new SmartContract({
    jsonRpcProvider,
    abi: ABI,
    contractAddress: gETHAddress
  })
  const gETHPrice = gETH.call({
    methodName: 'shareToAssetsPrice'
  })
  Logger.log('gETH: ' + parseFloat(Number(Number(gETHPrice[0].toBigInt()) / 1e18).toFixed(5)));


  const gDAI = new SmartContract({
    jsonRpcProvider,
    abi: ABI,
    contractAddress: gDAIAddress
  })
  const gDAIPrice = gDAI.call({
    methodName: 'shareToAssetsPrice'
  })
  Logger.log('gDAI: ' + parseFloat(Number(Number(gDAIPrice[0].toBigInt()) / 1e18).toFixed(5)));
}
```
