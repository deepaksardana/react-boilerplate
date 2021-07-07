import { createRext, IRext, IRextKeys } from "store/baseStoreProviders";
import URLRoutes from "URLRoutes";

const testRextKeys: IRextKeys = {
    identity: "testRext",
    method: 'get',
    primaryKey: "",
    url: URLRoutes.server.forgot
} 

const testRextKeys1: IRextKeys = {
    identity: "testRext1",
    method: 'get',
    primaryKey: "",
    url: URLRoutes.server.forgot
} 


export const textRext: IRext = createRext(testRextKeys);
export const textRext1: IRext = createRext(testRextKeys1);
