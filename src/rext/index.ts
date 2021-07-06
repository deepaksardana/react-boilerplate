import { createRext, IRext, IRextKeys } from "store/baseStoreProviders";
import URLRoutes from "URLRoutes";

const testRextKeys: IRextKeys = {
    identity: "testRext",
    method: 'get',
    primaryKey: "",
    url: URLRoutes.server.forgot
} 


export const textRext: IRext = createRext(testRextKeys);