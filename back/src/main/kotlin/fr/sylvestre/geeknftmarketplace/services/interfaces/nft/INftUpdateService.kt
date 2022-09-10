package fr.sylvestre.geeknftmarketplace.services.interfaces.nft

import fr.sylvestre.geeknftmarketplace.dto.requests.NftRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto
import java.util.UUID


interface INftUpdateService {
    fun updateNft(request: NftRequestDto, id: UUID): NftDto
}