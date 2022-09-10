package fr.sylvestre.geeknftmarketplace.services.impl.nft

import fr.sylvestre.geeknftmarketplace.dto.requests.NftRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto
import fr.sylvestre.geeknftmarketplace.exceptions.CategoryNotFoundException
import fr.sylvestre.geeknftmarketplace.repositories.CategoryRepository
import fr.sylvestre.geeknftmarketplace.repositories.NftRepository
import fr.sylvestre.geeknftmarketplace.services.interfaces.nft.INftCreateService
import org.springframework.stereotype.Service

@Service
class NftCreateService(val nftRepository: NftRepository, val categoryRepository: CategoryRepository) : INftCreateService {

    @Throws(CategoryNotFoundException::class)
    override fun createNft(request: NftRequestDto): NftDto {
        val categoryDb = categoryRepository.findCategoryDbById(request.categoryId) ?:
        throw CategoryNotFoundException(request.categoryId)
        val newNft = nftRepository.save(request.mapRequestToEntity(category = categoryDb))
        return NftDto.fromDb(newNft)
    }

}