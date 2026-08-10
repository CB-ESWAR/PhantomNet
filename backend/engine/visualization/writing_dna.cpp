#include "writing_dna.h"

using namespace std;

vector<double> WritingDNA::generate(
    const DashboardData& data)
{
    vector<double> dna;

    dna.push_back(data.stylometricScore);
    dna.push_back(data.fingerprintScore);
    dna.push_back(data.similarityScore);
    dna.push_back(data.readabilityScore);
    dna.push_back(data.statisticalScore);

    return dna;
}