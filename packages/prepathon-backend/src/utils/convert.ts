import base64js from 'base64-js';

export const serializePasskey = (passkey: any) => {
    return {
        ...passkey,
        credentialID: base64js.fromByteArray(passkey.credentialID),
        credentialPublicKey: base64js.fromByteArray(
            passkey.credentialPublicKey
        ),
    };
};

export const deserializePasskey = (passkey: any) => {
    return {
        ...passkey,
        credentialID: base64js.toByteArray(passkey.credentialID),
        credentialPublicKey: base64js.toByteArray(passkey.credentialPublicKey),
    };
};
