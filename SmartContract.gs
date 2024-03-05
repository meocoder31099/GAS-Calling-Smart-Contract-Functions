class SmartContract {

  constructor({ jsonRpcProvider, abi, contractAddress }) {
    this.jsonRpcProvider = jsonRpcProvider;
    this.abi = abi;
    this.address = contractAddress;
    this.interface = new ethers.utils.Interface(this.abi);
  }

  postRequest({ url, params }) {
    const payload = JSON.stringify(params);
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: payload,
    };
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  }

  call({ methodName, paramsValue = [] }) {

    try {
      const data = this.interface.encodeFunctionData(methodName, paramsValue);
      const params = {
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: this.address,
            data: data,
          },
          'latest',
        ],
        id: 1,
      };

      const { result } = this.postRequest({ url: this.jsonRpcProvider, params })
      const decodedData = this.interface.decodeFunctionResult(methodName, result);

      return decodedData
    } catch (error) {
      Logger.log(error)
      return undefined;
    }
  }
}
