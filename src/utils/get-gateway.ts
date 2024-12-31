import * as grpc from '@grpc/grpc-js';
import { connect, hash, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'node:crypto';
import fs from 'fs';
import path from 'path';
import env from '../types/env';

/**
 * Get Fabric Gateway object
 *
 * @returns Fabric Gateway object
 */
const getGateway = () => {
    const tlsRootCert = fs.readFileSync(path.join(env.FabricWalletPath, env.FabricTlsRootCert), 'utf-8');
    const signingCertificatePem = fs.readFileSync(path.join(env.FabricWalletPath, env.FabricSigningCert), 'utf-8');
    const privateKeyPem = fs.readFileSync(path.join(env.FabricWalletPath, env.FabricPrivateKey), 'utf-8');

    const privateKey = crypto.createPrivateKey(privateKeyPem);
    const signer = signers.newPrivateKeySigner(privateKey);

    const client = new grpc.Client(
        env.FabricGatewayPeerUrl,
        grpc.credentials.createSsl(Buffer.from(tlsRootCert)),
    );
    const gateway = connect({
        identity: {
            mspId: env.FabricMspId,
            credentials: Buffer.from(signingCertificatePem),
        },
        signer,
        hash: hash.sha256,
        client,
    });
    return { gateway, client };
};

export default getGateway;
