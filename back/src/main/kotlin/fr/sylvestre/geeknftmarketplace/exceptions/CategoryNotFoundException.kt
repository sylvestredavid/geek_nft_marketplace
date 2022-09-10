package fr.sylvestre.geeknftmarketplace.exceptions

import java.util.*

class CategoryNotFoundException(
    val id: UUID,
    override val message: String = "Catégorie avec l'id $id non trouvée"
    ): RuntimeException() {
}