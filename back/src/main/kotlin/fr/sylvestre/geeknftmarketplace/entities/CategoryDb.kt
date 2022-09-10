package fr.sylvestre.geeknftmarketplace.entities

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import java.util.UUID
import javax.persistence.*

@Entity
@Table(name = "categories")
data class CategoryDb(
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    val id: UUID? = null,
    val nom: String,
    @Type(type = "text")
    @Column(nullable = true)
    val cover: String? = null,
    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    var nfts: List<NftDb> = emptyList(),
)
