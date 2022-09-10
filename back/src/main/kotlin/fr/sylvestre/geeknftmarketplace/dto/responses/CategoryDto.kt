package fr.sylvestre.geeknftmarketplace.dto.responses

import fr.sylvestre.geeknftmarketplace.entities.CategoryDb
import java.util.UUID

data class CategoryDto(
    val id: UUID,
    val nom: String,
    val cover: String?
){
    companion object{
        fun fromDb(db: CategoryDb): CategoryDto {
            return CategoryDto(
                id =  db.id!!,
                nom = db.nom,
                cover = db.cover
            )
        }
    }
}
