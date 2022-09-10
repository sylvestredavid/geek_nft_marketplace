package fr.sylvestre.geeknftmarketplace.repositories

import fr.sylvestre.geeknftmarketplace.dto.responses.UserDto
import fr.sylvestre.geeknftmarketplace.entities.NftDb
import fr.sylvestre.geeknftmarketplace.entities.UserDb
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository: JpaRepository<UserDb, UUID> {
    fun findUserDbById(id: UUID): UserDb?
    fun findUserDbByAddress(address: String): UserDb?
}