package com.unbound.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.List;

@Component
public class UsernameGenerator {

    private final List<String> adjectives = List.of("red", "blue", "green", "quick", "silent", "loud", "bright");
    private final List<String> nouns = List.of("fox", "owl", "cat", "dog", "tree", "river", "sky");
    private final SecureRandom random = new SecureRandom();

    public String generate() {
        String adjective = adjectives.get(random.nextInt(adjectives.size()));
        String noun = nouns.get(random.nextInt(nouns.size()));
        String suffix = randomNanoId(3); // e.g. "8jd"
        return adjective + "-" + noun + "-" + suffix;
    }

    private String randomNanoId(int length) {
        String chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
