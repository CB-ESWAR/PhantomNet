#include "feature_extractor.h"

#include "lexical_features.h"
#include "statistical_features.h"
#include "syntactic_features.h"
#include "entropy_features.h"
#include "readability_features.h"
#include "rhythm_features.h"
#include "ai_pattern_detector.h"

#include <algorithm>

using namespace std;

namespace
{
double normalize(
    double value,
    double minimum,
    double maximum)
{
    if(maximum <= minimum)
        return 0.0;

    double result =
        (value - minimum) /
        (maximum - minimum);

    return max(
        0.0,
        min(1.0, result)
    );
}
}

FeatureVector FeatureExtractor::extract(
    const ProcessedText& text)
{
    FeatureVector features;

    //==================================================
    // Lexical Features
    //==================================================

    features.vocabularyDiversity =
        LexicalFeatures::vocabularyDiversity(text);

    features.typeTokenRatio =
        LexicalFeatures::typeTokenRatio(text);

    features.hapaxRatio =
        LexicalFeatures::hapaxRatio(text);

    features.lexicalDensity =
        LexicalFeatures::lexicalDensity(text);

    features.averageWordLength =
        LexicalFeatures::averageWordLength(text);

    features.longWordRatio =
        LexicalFeatures::longWordRatio(text);

    features.uniqueWordRatio =
        LexicalFeatures::uniqueWordRatio(text);

    //==================================================
    // Statistical Features
    //==================================================

    features.repetitionScore =
        StatisticalFeatures::repetitionScore(text);

    features.zipfScore =
        StatisticalFeatures::zipfScore(text);

    //==================================================
    // Entropy Features
    //==================================================

    features.wordEntropy =
        EntropyFeatures::wordEntropy(text);

    features.characterEntropy =
        EntropyFeatures::characterEntropy(text);

    //==================================================
    // Syntactic Features
    //==================================================

    features.averageSentenceLength =
        SyntacticFeatures::averageSentenceLength(text);

    features.sentenceLengthVariance =
        SyntacticFeatures::sentenceLengthVariance(text);

    features.sentenceLengthUniformity =
        SyntacticFeatures::sentenceLengthUniformity(text);

    features.averageParagraphLength =
        SyntacticFeatures::averageParagraphLength(text);

    //==================================================
    // Readability Features
    //==================================================

    features.fleschReadingEase =
        ReadabilityFeatures::fleschReadingEase(text);

    features.fleschKincaidGrade =
        ReadabilityFeatures::fleschKincaidGrade(text);

    features.gunningFogIndex =
        ReadabilityFeatures::gunningFogIndex(text);

    //==================================================
    // Rhythm Features
    //==================================================

    features.burstiness =
        RhythmFeatures::burstiness(text);

    features.rhythmConsistency =
        RhythmFeatures::rhythmConsistency(text);

    features.punctuationRhythm =
        RhythmFeatures::punctuationRhythm(text);

    features.paragraphRhythm =
        RhythmFeatures::paragraphRhythm(text);

    //==================================================
    // AI Fingerprint Features
    //==================================================

    features.transitionDensity =
        AIPatternDetector::transitionDensity(text);

    features.aiPhraseDensity =
        AIPatternDetector::aiPhraseDensity(text);

    features.sentenceOpeningSimilarity =
        AIPatternDetector::sentenceOpeningSimilarity(text);

    features.conclusionSimilarity =
        AIPatternDetector::conclusionSimilarity(text);

    features.hedgingScore =
        AIPatternDetector::hedgingScore(text);

    features.listPatternScore =
        AIPatternDetector::listPatternScore(text);

    features.templateSimilarity =
        AIPatternDetector::templateSimilarity(text);

    //==================================================
    // Engine Scores
    //==================================================

    features.stylometricScore =
        (
            features.vocabularyDiversity +
            features.typeTokenRatio +
            features.hapaxRatio +
            features.lexicalDensity +
            features.uniqueWordRatio
        ) / 5.0;

    double normalizedWordEntropy =
        normalize(
            features.wordEntropy,
            0.0,
            8.0
        );

    double normalizedCharacterEntropy =
        normalize(
            features.characterEntropy,
            0.0,
            8.0
        );

    features.statisticalScore =
        (
            normalizedWordEntropy +
            normalizedCharacterEntropy +
            features.repetitionScore +
            features.zipfScore
        ) / 4.0;

    double normalizedFlesch =
        normalize(
            features.fleschReadingEase,
            0.0,
            100.0
        );

    double normalizedKincaid =
        normalize(
            features.fleschKincaidGrade,
            0.0,
            18.0
        );

    double normalizedFog =
        normalize(
            features.gunningFogIndex,
            0.0,
            18.0
        );

    features.readabilityScore =
        (
            normalizedFlesch +
            normalizedKincaid +
            normalizedFog
        ) / 3.0;

    features.fingerprintScore =
        (
            features.transitionDensity +
            features.aiPhraseDensity +
            features.sentenceOpeningSimilarity +
            features.conclusionSimilarity +
            features.hedgingScore +
            features.listPatternScore +
            features.templateSimilarity
        ) / 7.0;

    features.similarityScore =
        (
            features.rhythmConsistency +
            features.sentenceLengthUniformity
        ) / 2.0;

    features.semanticSimilarity = 0.0;

    features.fingerprintSimilarity =
        features.fingerprintScore;

    return features;
}