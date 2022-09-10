package fr.sylvestre.geeknftmarketplace.services.interfaces.nft

import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto


interface INftSearchService {
    fun getAllNft(): List<NftDto>
}