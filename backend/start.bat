@echo off
echo.
echo ========================================
echo   Margadarshak College Comparator API
echo ========================================
echo.

REM Check if virtual environment exists
if exist venv (
    echo [+] Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo [!] No virtual environment found
    echo [*] Create one with: python -m venv venv
)

echo [+] Installing/upgrading dependencies...
pip install -r requirements.txt --quiet

echo.
echo [+] Starting FastAPI server...
echo     API: http://localhost:8000
echo     Docs: http://localhost:8000/docs
echo.

python main.py


