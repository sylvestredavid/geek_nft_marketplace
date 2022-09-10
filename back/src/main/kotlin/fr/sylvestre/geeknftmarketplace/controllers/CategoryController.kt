package fr.sylvestre.geeknftmarketplace.controllers

import fr.sylvestre.geeknftmarketplace.dto.requests.CategoryRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.CategoryDto
import fr.sylvestre.geeknftmarketplace.services.interfaces.category.ICategoryCreateService
import fr.sylvestre.geeknftmarketplace.services.interfaces.category.ICategorySearchService
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping("/categories")
class CategoryController(
    val searchService: ICategorySearchService,
    val createService: ICategoryCreateService,
    ) {

    @GetMapping("")
    fun getAll(): List<CategoryDto> {
        return searchService.getAllCategories()
    }

    @PostMapping("/create")
    fun create(@RequestBody request: CategoryRequestDto): CategoryDto {
        return createService.createCategory(request)
    }
}