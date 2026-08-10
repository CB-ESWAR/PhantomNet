#ifndef AI_PATTERNS_H
#define AI_PATTERNS_H

#include <unordered_set>
#include <string>

static const std::unordered_set<std::string> AI_TRANSITIONS =
{
    "however",
    "therefore",
    "moreover",
    "furthermore",
    "thus",
    "overall",
    "in conclusion",
    "additionally",
    "consequently",
    "meanwhile",
    "nevertheless",
    "similarly",
    "accordingly",
    "for example",
    "for instance"
};

static const std::unordered_set<std::string> AI_OPENINGS =
{
    "today",
    "in today's",
    "it is important",
    "let us",
    "this article",
    "this essay",
    "this document",
    "in this article",
    "in this essay"
};

static const std::unordered_set<std::string> AI_ENDINGS =
{
    "in conclusion",
    "to summarize",
    "overall",
    "thank you",
    "finally",
    "to conclude"
};

static const std::unordered_set<std::string> AI_HEDGING =
{
    "may",
    "might",
    "could",
    "typically",
    "generally",
    "often",
    "usually",
    "commonly",
    "likely",
    "possibly"
};

#endif