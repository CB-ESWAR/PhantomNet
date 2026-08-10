cmake_minimum_required(VERSION 3.16)

project(PhantomNetEngine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(
    .
)

file(GLOB_RECURSE SOURCES
    "*.cpp"
)

add_executable(
    phantomnet
    ${SOURCES}
)