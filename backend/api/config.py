from pathlib import Path
import os


API_DIR = Path(__file__).resolve().parent
BACKEND_DIR = API_DIR.parent
PROJECT_ROOT = BACKEND_DIR.parent


WINDOWS_ENGINE_PATH = (
    BACKEND_DIR
    / "build"
    / "engine"
    / "phantomnet.exe"
)

LINUX_ENGINE_PATH = (
    BACKEND_DIR
    / "build"
    / "engine"
    / "phantomnet"
)


if WINDOWS_ENGINE_PATH.exists():
    ENGINE_PATH = WINDOWS_ENGINE_PATH
else:
    ENGINE_PATH = LINUX_ENGINE_PATH


UPLOAD_FOLDER = (
    BACKEND_DIR
    / "uploads"
)

UPLOAD_FOLDER.mkdir(
    parents=True,
    exist_ok=True
)