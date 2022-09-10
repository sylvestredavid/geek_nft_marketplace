package fr.sylvestre.geeknftmarketplace.services.impl.category

import fr.sylvestre.geeknftmarketplace.dto.responses.CategoryDto
import fr.sylvestre.geeknftmarketplace.repositories.CategoryRepository
import fr.sylvestre.geeknftmarketplace.services.interfaces.category.ICategorySearchService
import org.springframework.stereotype.Service

@Service
class CategorySearchService(val collectionRepository: CategoryRepository) : ICategorySearchService {

    override fun getAllCategories(): List<CategoryDto> {
        return collectionRepository.findAll().map { CategoryDto.fromDb(it) }
    }

}