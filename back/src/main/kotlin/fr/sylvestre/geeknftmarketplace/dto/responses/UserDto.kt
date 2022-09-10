package fr.sylvestre.geeknftmarketplace.dto.responses

import fr.sylvestre.geeknftmarketplace.entities.UserDb
import java.util.UUID

data class UserDto(
    val id: UUID,
    val nom: String,
    val address: String,
){
    companion object{
        fun fromDb(db: UserDb): UserDto {
            return UserDto(
                id =  db.id!!,
                nom = db.nom,
                address = db.address
            )
        }
    }
}
