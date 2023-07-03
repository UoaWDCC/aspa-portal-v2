import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

declare global {
  namespace Express {
    export interface Request {
      decodedToken?: DecodedIdToken;
      userFbId?: string;
    }
  }
}
