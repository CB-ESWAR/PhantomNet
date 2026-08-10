#include "report_generator.h"

#include <sstream>
#include <iomanip>

using namespace std;

string ReportGenerator::generate(
    const Prediction& prediction)
{
    stringstream report;

    report << "=========================================\n";
    report << "           PHANTOMNET REPORT\n";
    report << "=========================================\n\n";

    report << "FINAL VERDICT\n";
    report << "-----------------------------------------\n";
    report << prediction.verdict << "\n\n";

    report << fixed << setprecision(2);

    report << "AI Probability      : "
           << prediction.aiProbability
           << "%\n";

    report << "Human Probability   : "
           << prediction.humanProbability
           << "%\n";

    report << "Confidence          : "
           << prediction.confidence
           << "%\n";

    report << "Reliability         : "
           << prediction.reliability
           << "%\n";

    report << "Reliability Grade   : "
           << prediction.reliabilityGrade
           << "\n\n";

    report << "ENGINE SCORES\n";
    report << "-----------------------------------------\n";

    report << "Stylometric         : "
           << prediction.stylometricScore
           << "\n";

    report << "Statistical         : "
           << prediction.statisticalScore
           << "\n";

    report << "Readability         : "
           << prediction.readabilityScore
           << "\n";

    report << "Fingerprint         : "
           << prediction.fingerprintScore
           << "\n";

    report << "Similarity          : "
           << prediction.similarityScore
           << "\n\n";

    report << "AI MODEL SIMILARITY\n";
    report << "-----------------------------------------\n";

    report << "GPT                 : "
           << prediction.gptSimilarity
           << "%\n";

    report << "Claude              : "
           << prediction.claudeSimilarity
           << "%\n";

    report << "Gemini              : "
           << prediction.geminiSimilarity
           << "%\n";

    report << "DeepSeek            : "
           << prediction.deepseekSimilarity
           << "%\n";

    report << "Copilot             : "
           << prediction.copilotSimilarity
           << "%\n";

    report << "Mistral             : "
           << prediction.mistralSimilarity
           << "%\n";

    report << "Llama               : "
           << prediction.llamaSimilarity
           << "%\n\n";

    report << "EVIDENCE\n";
    report << "-----------------------------------------\n";

    for(const auto& reason : prediction.evidence)
    {
        report << "• " << reason << "\n";
    }

    report << "\n";

    report << "RECOMMENDATION\n";
    report << "-----------------------------------------\n";

    report << prediction.recommendation << "\n";

    report << "\n=========================================\n";

    return report.str();
}