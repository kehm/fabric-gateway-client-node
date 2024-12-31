import { TextDecoder } from 'node:util';
import getGateway from '../utils/get-gateway';

const utf8Decoder = new TextDecoder();

/**
 * Query the blockchain
 *
 * @param channel Channel name
 * @param chaincode Chaincode name
 * @param func Function name
 * @param args Function arguments
 * @returns Query result
 */
const query = async (
    channel: string,
    chaincode: string,
    func: string,
    args: string[],
) => {
    const { gateway, client } = getGateway();
    try {
        const network = gateway.getNetwork(channel);
        const contract = network.getContract(chaincode);
        const result = await contract.evaluateTransaction(func, ...args);
        return utf8Decoder.decode(result);
    } finally {
        gateway.close();
        client.close();
    }
};

export default query;
