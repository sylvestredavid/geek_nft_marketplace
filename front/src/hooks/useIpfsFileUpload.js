import {useState} from "react";

export const useIpfsFileUpload = (client) => {
    const [fileUrl, setFileUrl] = useState(null)

    async function uploadImg(e) {
        // upload image to IPFS
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://infura-ipfs.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    return [fileUrl, setFileUrl, uploadImg]
}
