package fr.sylvestre.geeknftmarketplace.services.impl.nft

import fr.sylvestre.geeknftmarketplace.dto.requests.NftRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto
import fr.sylvestre.geeknftmarketplace.exceptions.CategoryNotFoundException
import fr.sylvestre.geeknftmarketplace.repositories.CategoryRepository
import fr.sylvestre.geeknftmarketplace.repositories.NftRepository
import fr.sylvestre.geeknftmarketplace.services.interfaces.nft.INftUpdateService
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class NftUpdateService(val nftRepository: NftRepository, val categoryRepository: CategoryRepository) : INftUpdateService {

    @Throws(CategoryNotFoundException::class)
    override fun updateNft(request: NftRequestDto, id: UUID): NftDto {
        val categoryDb = categoryRepository.findCategoryDbById(request.categoryId) ?:
        throw CategoryNotFoundException(request.categoryId)
        val newNft = nftRepository.save(request.mapRequestToEntity(id, categoryDb))
        return NftDto.fromDb(newNft)
    }

}