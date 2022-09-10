package fr.sylvestre.geeknftmarketplace.dto.requests

import fr.sylvestre.geeknftmarketplace.entities.CategoryDb
import java.util.UUID

data class CategoryRequestDto(
    val nom: String,
    val cover: String,
){
    fun mapRequestToEntity(id: UUID? = null): CategoryDb {
        return CategoryDb(
            id = id,
            nom = this.nom,
            cover = this.cover
        )
    }
}
