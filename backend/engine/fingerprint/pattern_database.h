#ifndef PATTERN_DATABASE_H
#define PATTERN_DATABASE_H

#include <unordered_map>
#include <string>

struct FingerprintProfile
{
    double transitionWeight;
    double phraseWeight;
    double readabilityWeight;
    double rhythmWeight;
    double lexicalWeight;
    double entropyWeight;
};

static const std::unordered_map<std::string, FingerprintProfile> MODEL_PROFILES =
{
    {
        "GPT",
        {0.22,0.20,0.16,0.14,0.14,0.14}
    },

    {
        "Claude",
        {0.15,0.18,0.22,0.18,0.14,0.13}
    },

    {
        "Gemini",
        {0.17,0.16,0.18,0.17,0.17,0.15}
    },

    {
        "DeepSeek",
        {0.19,0.17,0.15,0.18,0.16,0.15}
    },

    {
        "Copilot",
        {0.20,0.18,0.14,0.18,0.16,0.14}
    },

    {
        "Mistral",
        {0.18,0.16,0.16,0.17,0.17,0.16}
    },

    {
        "Llama",
        {0.17,0.17,0.17,0.17,0.16,0.16}
    }
};

#endif