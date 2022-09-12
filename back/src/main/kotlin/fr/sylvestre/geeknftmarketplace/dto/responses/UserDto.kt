package fr.sylvestre.geeknftmarketplace.dto.responses

import fr.sylvestre.geeknftmarketplace.entities.UserDb
import java.util.UUID

data class UserDto(
    val id: UUID,
    val name: String,
    val address: String,
){
    companion object{
        fun fromDb(db: UserDb): UserDto {
            return UserDto(
                id =  db.id!!,
                name = db.name,
                address = db.address
            )
        }
    }
}
