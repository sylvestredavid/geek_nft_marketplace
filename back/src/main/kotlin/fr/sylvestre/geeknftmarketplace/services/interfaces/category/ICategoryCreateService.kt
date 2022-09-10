package fr.sylvestre.geeknftmarketplace.services.interfaces.category

import fr.sylvestre.geeknftmarketplace.dto.requests.CategoryRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.CategoryDto


interface ICategoryCreateService {
    fun createCategory(request: CategoryRequestDto): CategoryDto
}