package fr.sylvestre.geeknftmarketplace.repositories

import fr.sylvestre.geeknftmarketplace.entities.NftDb
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface NftRepository: JpaRepository<NftDb, UUID> {
    fun findNftDbById(id: UUID): NftDb?
}