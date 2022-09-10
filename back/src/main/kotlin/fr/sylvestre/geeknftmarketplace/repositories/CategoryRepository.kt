package fr.sylvestre.geeknftmarketplace.repositories

import fr.sylvestre.geeknftmarketplace.entities.CategoryDb
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface CategoryRepository: JpaRepository<CategoryDb, UUID> {
    fun findCategoryDbById(id: UUID): CategoryDb?
}