package fr.sylvestre.geeknftmarketplace.services.impl.nft

import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto
import fr.sylvestre.geeknftmarketplace.repositories.NftRepository
import fr.sylvestre.geeknftmarketplace.services.interfaces.nft.INftSearchService
import org.springframework.stereotype.Service

@Service
class NftSearchService(val nftRepository: NftRepository) : INftSearchService {

    override fun getAllNft(): List<NftDto> {
        return nftRepository.findAll().map { NftDto.fromDb(it) }
    }

}