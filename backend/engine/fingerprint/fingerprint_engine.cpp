#include "fingerprint_engine.h"

#include "pattern_database.h"

#include "gpt_patterns.h"
#include "claude_patterns.h"
#include "gemini_patterns.h"
#include "deepseek_patterns.h"
#include "copilot_patterns.h"
#include "mistral_patterns.h"
#include "llama_patterns.h"

#include <algorithm>

using namespace std;

namespace
{

double normalize(double value)
{
    if(value < 0.0)
        return 0.0;

    if(value > 1.0)
        return 1.0;

    return value;
}

double stylometricScore(
    const FeatureVector& f,
    const FingerprintProfile& p)
{
    double score = 0.0;

    score += f.transitionDensity * p.transitionWeight;

    score += f.aiPhraseDensity * p.phraseWeight;

    score += normalize(f.fleschReadingEase / 100.0)
             * p.readabilityWeight;

    score += f.rhythmConsistency
             * p.rhythmWeight;

    score += f.lexicalDensity
             * p.lexicalWeight;

    score += normalize(f.wordEntropy / 8.0)
             * p.entropyWeight;

    return normalize(score);
}

}

double FingerprintEngine::gptScore(
    const ProcessedText&,
    const FeatureVector& features)
{
    return stylometricScore(
        features,
        MODEL_PROFILES.at("GPT")
    );
}

double FingerprintEngine::claudeScore(
    const ProcessedText&,
    const FeatureVector& features)
{
    return stylometricScore(
        features,
        MODEL_PROFILES.at("Claude")
    );
}

double FingerprintEngine::geminiScore(
    const ProcessedText&,
    const FeatureVector& features)
{
    return stylometricScore(
        features,
        MODEL_PROFILES.at("Gemini")
    );
}

double FingerprintEngine::deepseekScore(
    const ProcessedText&,
    const FeatureVector& features)
{
    return stylometricScore(
        features,
        MODEL_PROFILES.at("DeepSeek")
    );
}

double FingerprintEngine::copilotScore(
    const ProcessedText&,
    const FeatureVector& features)
{
    return stylometricScore(
        features,
        MODEL_PROFILES.at("Copilot")
    );
}

double FingerprintEngine::mistralScore(
    const ProcessedText&,
    const FeatureVector& features)
{
    return stylometricScore(
        features,
        MODEL_PROFILES.at("Mistral")
    );
}

double FingerprintEngine::llamaScore(
    const ProcessedText&,
    const FeatureVector& features)
{
    return stylometricScore(
        features,
        MODEL_PROFILES.at("Llama")
    );
}

double FingerprintEngine::overallScore(
    const ProcessedText& text,
    const FeatureVector& features)
{
    double score = 0.0;

    score += gptScore(text, features);

    score += claudeScore(text, features);

    score += geminiScore(text, features);

    score += deepseekScore(text, features);

    score += copilotScore(text, features);

    score += mistralScore(text, features);

    score += llamaScore(text, features);

    return score / 7.0;
}