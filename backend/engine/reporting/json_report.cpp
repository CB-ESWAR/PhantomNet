#include "json_report.h"

#include <sstream>
#include <iomanip>

using namespace std;

namespace
{
string escapeJson(const string& text)
{
    string result;

    for(char c : text)
    {
        switch(c)
        {
            case '"':
                result += "\\\"";
                break;

            case '\\':
                result += "\\\\";
                break;

            case '\n':
                result += "\\n";
                break;

            case '\r':
                result += "\\r";
                break;

            case '\t':
                result += "\\t";
                break;

            default:
                result += c;
        }
    }

    return result;
}
}

string JsonReport::generate(
    const Prediction& prediction)
{
    stringstream json;

    json << fixed << setprecision(2);

    json << "{\n";

    json << "  \"verdict\":\""
         << escapeJson(prediction.verdict)
         << "\",\n";

    json << "  \"aiProbability\":"
         << prediction.aiProbability
         << ",\n";

    json << "  \"humanProbability\":"
         << prediction.humanProbability
         << ",\n";

    json << "  \"confidence\":"
         << prediction.confidence
         << ",\n";

    json << "  \"reliability\":"
         << prediction.reliability
         << ",\n";

    json << "  \"reliabilityGrade\":\""
         << escapeJson(prediction.reliabilityGrade)
         << "\",\n";

    json << "  \"engineScores\":{\n";

    json << "    \"stylometric\":"
         << prediction.stylometricScore
         << ",\n";

    json << "    \"statistical\":"
         << prediction.statisticalScore
         << ",\n";

    json << "    \"readability\":"
         << prediction.readabilityScore
         << ",\n";

    json << "    \"fingerprint\":"
         << prediction.fingerprintScore
         << ",\n";

    json << "    \"similarity\":"
         << prediction.similarityScore
         << "\n";

    json << "  },\n";

    json << "  \"modelSimilarity\":{\n";

    json << "    \"gpt\":"
         << prediction.gptSimilarity
         << ",\n";

    json << "    \"claude\":"
         << prediction.claudeSimilarity
         << ",\n";

    json << "    \"gemini\":"
         << prediction.geminiSimilarity
         << ",\n";

    json << "    \"deepseek\":"
         << prediction.deepseekSimilarity
         << ",\n";

    json << "    \"copilot\":"
         << prediction.copilotSimilarity
         << ",\n";

    json << "    \"mistral\":"
         << prediction.mistralSimilarity
         << ",\n";

    json << "    \"llama\":"
         << prediction.llamaSimilarity
         << "\n";

    json << "  },\n";

    json << "  \"evidence\":[\n";

    for(size_t i = 0;
        i < prediction.evidence.size();
        i++)
    {
        json << "    \""
             << escapeJson(prediction.evidence[i])
             << "\"";

        if(i + 1 < prediction.evidence.size())
            json << ",";

        json << "\n";
    }

    json << "  ],\n";

    json << "  \"recommendation\":\""
         << escapeJson(prediction.recommendation)
         << "\"\n";

    json << "}";

    return json.str();
}