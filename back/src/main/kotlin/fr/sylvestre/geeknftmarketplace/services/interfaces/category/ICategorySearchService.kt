package fr.sylvestre.geeknftmarketplace.services.interfaces.category

import fr.sylvestre.geeknftmarketplace.dto.responses.CategoryDto


interface ICategorySearchService {
    fun getAllCategories(): List<CategoryDto>
}