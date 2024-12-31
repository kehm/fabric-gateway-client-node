import { TextDecoder } from 'node:util';
import getGateway from '../utils/get-gateway';

const utf8Decoder = new TextDecoder();

/**
 * Invoke a blockchain transaction
 *
 * @param channel Channel name
 * @param chaincode Chaincode name
 * @param func Function name
 * @param transient Transient data (undefined if none)
 * @param args Function arguments
 * @returns Invoke response
 */
const invoke = async (
    channel: string,
    chaincode: string,
    func: string,
    transient: Record<string, string> | undefined,
    args: string[],
) => {
    const { gateway, client } = getGateway();
    try {
        const network = gateway.getNetwork(channel);
        const contract = network.getContract(chaincode);
        let result;
        if (transient) {
            const transaction = await contract.newProposal(
                func,
                {
                    arguments: args,
                    transientData: transient,
                },
            ).endorse();
            const commit = await transaction.submit();
            result = commit.getResult();
        } else {
            result = await contract.submitTransaction(func, ...args);
        }
        return utf8Decoder.decode(result);
    } finally {
        gateway.close();
        client.close();
    }
};

export default invoke;
