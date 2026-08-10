#ifndef FEATURE_VECTOR_H
#define FEATURE_VECTOR_H

struct FeatureVector
{
    // =====================================================
    // Lexical Features
    // =====================================================

    double vocabularyDiversity = 0.0;
    double typeTokenRatio = 0.0;
    double hapaxRatio = 0.0;
    double lexicalDensity = 0.0;
    double averageWordLength = 0.0;
    double longWordRatio = 0.0;
    double uniqueWordRatio = 0.0;

    // =====================================================
    // Statistical Features
    // =====================================================

    double wordEntropy = 0.0;
    double characterEntropy = 0.0;
    double repetitionScore = 0.0;
    double zipfScore = 0.0;

    // =====================================================
    // Sentence Features
    // =====================================================

    double averageSentenceLength = 0.0;
    double sentenceLengthVariance = 0.0;
    double sentenceLengthUniformity = 0.0;
    double burstiness = 0.0;
    double averageParagraphLength = 0.0;

    // =====================================================
    // Style Features
    // =====================================================

    double stopwordRatio = 0.0;
    double punctuationDensity = 0.0;
    double commaDensity = 0.0;
    double uppercaseRatio = 0.0;
    double digitRatio = 0.0;

    // =====================================================
    // Readability Features
    // =====================================================

    double fleschReadingEase = 0.0;
    double fleschKincaidGrade = 0.0;
    double gunningFogIndex = 0.0;
    double smogIndex = 0.0;
    double colemanLiauIndex = 0.0;

    // =====================================================
    // AI Fingerprint Features
    // =====================================================

    double aiPhraseDensity = 0.0;
    double transitionDensity = 0.0;
    double sentenceOpeningSimilarity = 0.0;
    double conclusionSimilarity = 0.0;
    double listPatternScore = 0.0;
    double hedgingScore = 0.0;
    double templateSimilarity = 0.0;

    // =====================================================
    // Rhythm Features
    // =====================================================

    double rhythmConsistency = 0.0;
    double punctuationRhythm = 0.0;
    double paragraphRhythm = 0.0;

    // =====================================================
    // Similarity Features
    // =====================================================

    double semanticSimilarity = 0.0;
    double fingerprintSimilarity = 0.0;

    // =====================================================
    // Engine Scores
    // =====================================================

    double stylometricScore = 0.0;
    double statisticalScore = 0.0;
    double readabilityScore = 0.0;
    double fingerprintScore = 0.0;
    double similarityScore = 0.0;
};

#endif