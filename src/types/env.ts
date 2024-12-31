export default {
    Port: process.env.PORT || '',
    FabricWalletPath: process.env.FABRIC_WALLET_PATH || '',
    FabricMspId: process.env.FABRIC_MSP_ID || '',
    FabricTlsRootCert: process.env.FABRIC_TLS_ROOT_CERT || '',
    FabricSigningCert: process.env.FABRIC_SIGNING_CERT || '',
    FabricPrivateKey: process.env.FABRIC_PRIVATE_KEY || '',
    FabricGatewayPeerUrl: process.env.FABRIC_GATEWAY_PEER_URL || '',
};
