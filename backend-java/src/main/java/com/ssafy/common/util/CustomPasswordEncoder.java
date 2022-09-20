package com.ssafy.common.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class CustomPasswordEncoder {
    @Value("${spring.secret.key}")
    private String key;
    public String encrypt(String password){
        SecretKeySpec keySpec = null;
        keySpec = new SecretKeySpec(key.getBytes(), "AES");

        Cipher cipher = null;

        try{
            cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, keySpec);
            return new String(Base64.getEncoder().encode(cipher.doFinal(password.getBytes())));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public String decrypt(String encryptPassword){
        SecretKeySpec keySpec = null;

        keySpec = new SecretKeySpec(key.getBytes(), "AES");
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, keySpec);
            return new String(cipher.doFinal(Base64.getDecoder().decode(encryptPassword.getBytes())));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
