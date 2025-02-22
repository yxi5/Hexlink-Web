import * as functions from "firebase-functions";
import * as ethers from "ethers";
import {signWithKmsKey, getEthAddressFromPublicKey} from "./kms";
import {kmsConfig, KMS_KEY_TYPE} from "./config";
import {
  GenNameHashSuccess,
  genNameHash,
  toEthSignedMessageHash,
  TWITTER_IDENTITY_TYPE,
  EMAIL_IDENTITY_TYPE,
} from "./account";
import {Firebase} from "./firebase";

const OAUTH_AUTH_TYPE = "oauth";
const OTP_AUTH_TYPE = "otp";

export interface AuthProof {
  name: string,
  requestId: string,
  authType: string,
  identityType: string,
  issuedAt: number,
  signature: string
}

export const genTwitterOAuthProof = functions.https.onCall(
    async (data, context) => {
      Firebase.getInstance();
      const uid = context.auth?.uid;
      if (!uid) {
        return {code: 401, message: "Unauthorized Call"};
      }

      return genAuthProof(uid, TWITTER_IDENTITY_TYPE, OAUTH_AUTH_TYPE,
          data.requestId, data.version);
    });

export const genEmailOTPProof = functions.https.onCall(
    async (data, context) => {
      Firebase.getInstance();
      const uid = context.auth?.uid;
      if (!uid) {
        return {code: 401, message: "Unauthorized Call"};
      }

      return genAuthProof(uid, EMAIL_IDENTITY_TYPE, OTP_AUTH_TYPE,
          data.requestId, data.version);
    });

const genAuthProof = async (uid: string, identity: string,
    auth: string, requestId: string, version?: number) => {
  const result = await genNameHash(uid, version, identity);
  if (result.code !== 200) {
    return result;
  }
  const {nameHash} = result as GenNameHashSuccess;

  const identityType = hash(identity);
  const authType = hash(auth);

  // reserve some time for current block
  const issuedAt = Math.round(Date.now() / 1000) - 30;
  const message = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
          ["bytes32", "bytes32", "uint256", "bytes32", "bytes32"],
          [
            nameHash,
            requestId,
            issuedAt,
            identityType,
            authType,
          ]
      )
  );

  const sig = await signWithKmsKey(
      KMS_KEY_TYPE[KMS_KEY_TYPE.operator],
      toEthSignedMessageHash(message)
  ) as string;
  const validatorAddr = kmsConfig().get(
      KMS_KEY_TYPE[KMS_KEY_TYPE.operator]
  )?.publicAddress;
  const encodedSig = ethers.utils.defaultAbiCoder.encode(
      ["address", "bytes"], [validatorAddr, sig]
  );

  const AuthProof: AuthProof = {
    name: nameHash,
    requestId: requestId,
    issuedAt: issuedAt,
    identityType: identity,
    authType: auth,
    signature: encodedSig,
  };
  return {code: 200, authProof: AuthProof};
};

const hash = function(value: string) {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(value));
};

export const calcEthAddress = functions.https.onCall(
    async (data, context) => {
      Firebase.getInstance();
      return getEthAddressFromPublicKey(data.keyId, data.keyType);
    }
);
