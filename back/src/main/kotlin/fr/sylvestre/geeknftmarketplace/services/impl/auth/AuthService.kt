package fr.sylvestre.geeknftmarketplace.services.impl.auth

import fr.sylvestre.geeknftmarketplace.dto.requests.LoginRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.LoginResponseDto
import fr.sylvestre.geeknftmarketplace.dto.responses.UserDto
import fr.sylvestre.geeknftmarketplace.entities.UserDb
import fr.sylvestre.geeknftmarketplace.repositories.UserRepository
import fr.sylvestre.geeknftmarketplace.services.interfaces.auth.IAuthService
import fr.sylvestre.geeknftmarketplace.utils.JwtUtils
import org.springframework.stereotype.Service
import org.web3j.crypto.ECDSASignature
import org.web3j.crypto.Hash
import org.web3j.crypto.Keys
import org.web3j.crypto.Sign
import org.web3j.crypto.Sign.SignatureData
import org.web3j.utils.Numeric
import java.math.BigInteger
import java.util.*
import javax.persistence.EntityNotFoundException
import javax.security.auth.message.AuthException


@Service
class AuthService(val userRepository: UserRepository) : IAuthService {

    override fun login(request: LoginRequestDto): LoginResponseDto {
        if (!validate(request.signature, request.message, request.address)) {
            throw AuthException("La signature ne correspond pas à l'adresse")
        }

        val userDb: UserDb? = userRepository.findUserDbByAddress(request.address)

        userDb?.let {
            return LoginResponseDto(UserDto.fromDb(it), JwtUtils.generateToken(userDb))
        }

        val newUserDb = userRepository.save(UserDb(name = "unamed", address = request.address))

        return LoginResponseDto(UserDto.fromDb(newUserDb), JwtUtils.generateToken(newUserDb))
    }

    override fun validateToken(jwt: String): UserDto {
        val userId = JwtUtils.validateToken(jwt);

        userRepository.findUserDbById(userId).let {
            if(it == null) {
                throw EntityNotFoundException("user introuvable")
            }
            return UserDto.fromDb(it)
        }
    }

    fun validate(signature: String?, message: String, address: String): Boolean {
        // Reference resources eth_sign in https://github.com/ethereum/wiki/wiki/JSON-RPC
        // eth_sign
        // The sign method calculates an Ethereum specific signature with:
        //    sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))).
        //
        // By adding a prefix to the message makes the calculated signature recognisable as an Ethereum specific signature.
        // This prevents misuse where a malicious DApp can sign arbitrary data (e.g. transaction) and use the signature to
        // impersonate the victim.
        val personnalPrefix = "\u0019Ethereum Signed Message:\n"
        val prefix: String = personnalPrefix + message.length
        val msgHash: ByteArray = Hash.sha3((prefix + message).toByteArray())
        val signatureBytes = Numeric.hexStringToByteArray(signature)
        var v = signatureBytes[64]
        if (v < 27) {
            v = (v + 27).toByte()
        }
        val sd = SignatureData(
            v,
            Arrays.copyOfRange(signatureBytes, 0, 32),
            Arrays.copyOfRange(signatureBytes, 32, 64)
        )
        var addressRecovered: String? = null
        var match = false

        val ecdsa = ECDSASignature(BigInteger(1, sd.r), BigInteger(1, sd.s))
        // Iterate for each possible key to recover
        for (i in 0..10) {
            val publicKey: BigInteger? = Sign.recoverFromSignature(
                i,
                ecdsa,
                msgHash
            )
            if (publicKey != null) {
                addressRecovered = "0x" + Keys.getAddress(publicKey)
                if (addressRecovered.lowercase() == address.lowercase()) {
                    match = true
                    break
                }
            }
        }
        return match
    }

}