package fr.sylvestre.geeknftmarketplace.services.impl.category

import fr.sylvestre.geeknftmarketplace.dto.requests.CategoryRequestDto
import fr.sylvestre.geeknftmarketplace.dto.requests.NftRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.CategoryDto
import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto
import fr.sylvestre.geeknftmarketplace.exceptions.CategoryNotFoundException
import fr.sylvestre.geeknftmarketplace.repositories.CategoryRepository
import fr.sylvestre.geeknftmarketplace.repositories.NftRepository
import fr.sylvestre.geeknftmarketplace.services.interfaces.category.ICategoryCreateService
import fr.sylvestre.geeknftmarketplace.services.interfaces.nft.INftCreateService
import org.springframework.stereotype.Service

@Service
class CategoryCreateService(val categoryRepository: CategoryRepository) : ICategoryCreateService {

    override fun createCategory(request: CategoryRequestDto): CategoryDto {
        val newCat = categoryRepository.save(request.mapRequestToEntity())
        return CategoryDto.fromDb(newCat)
    }

}