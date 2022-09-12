package fr.sylvestre.geeknftmarketplace.entities

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "nfts")
data class NftDb(
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id: UUID? = null,
    val name: String,
    @Type(type = "text")
    val description: String,
    @Type(type = "text")
    val fileUri: String,
    val owner: String,
    val toSell: Boolean,
    val weiPrice: String,
    @Column(nullable = true)
    val tokenId: String? = null,
    @ManyToOne
    @JoinColumn(name="category_id", nullable=false)
    val category: CategoryDb,
)
