package fr.sylvestre.geeknftmarketplace.dto.responses

import fr.sylvestre.geeknftmarketplace.entities.CategoryDb
import java.util.UUID

data class CategoryDto(
    val id: UUID,
    val name: String,
    val cover: String?
){
    companion object{
        fun fromDb(db: CategoryDb): CategoryDto {
            return CategoryDto(
                id =  db.id!!,
                name = db.name,
                cover = db.cover
            )
        }
    }
}
