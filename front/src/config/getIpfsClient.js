import {create} from "ipfs-http-client";

export const getIpfsClient = () => {
    const projectId = "2E5oVYRE3ZAdch970sgqL23Od2E";
    const projectSecret = "bbbff22fd463d1797f4fec5d59debbce";
    const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
    return create({
        url: "https://infura-ipfs.io:5001/api/v0",
        headers: {
            authorization,
        },
    })
}
