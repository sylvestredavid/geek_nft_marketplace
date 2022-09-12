package fr.sylvestre.geeknftmarketplace.utils

import fr.sylvestre.geeknftmarketplace.entities.UserDb
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jws
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.Key
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*
import javax.crypto.spec.SecretKeySpec


object JwtUtils {

    private const val secret = "asdfSFS34wfsdfsdfSDSD32dfsddDDerQSNCK34SOWEK5354fdgdf4"

    fun generateToken(userDb: UserDb): String{

        val hmacKey: Key = SecretKeySpec(
            Base64.getDecoder().decode(secret),
            SignatureAlgorithm.HS256.jcaName
        )
        return Jwts.builder()
            .claim("id", userDb.id!!)
            .setSubject(userDb.name)
            .setId(UUID.randomUUID().toString())
            .setIssuedAt(Date.from(Instant.now()))
            .setExpiration(Date.from(Instant.now().plus(24, ChronoUnit.HOURS)))
            .signWith(hmacKey)
            .compact()
    }

    fun validateToken(token: String): UUID {
        val hmacKey: Key = SecretKeySpec(
            Base64.getDecoder().decode(secret),
            SignatureAlgorithm.HS256.jcaName
        )

        val jws: Jws<Claims> =  Jwts.parserBuilder()
            .setSigningKey(hmacKey)
            .build()
            .parseClaimsJws(token)

        return UUID.fromString(jws.body["id"].toString())
    }
}