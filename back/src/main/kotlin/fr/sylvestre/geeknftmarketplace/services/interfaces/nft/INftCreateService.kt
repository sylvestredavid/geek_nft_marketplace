package fr.sylvestre.geeknftmarketplace.services.interfaces.nft

import fr.sylvestre.geeknftmarketplace.dto.requests.NftRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto


interface INftCreateService {
    fun createNft(request: NftRequestDto): NftDto
}