# Start zowel backend als frontend voor Stuc- & Renovatiebedrijf Nijmegen
Write-Host "==============================" -ForegroundColor Cyan
Write-Host " Stuc- & Renovatiebedrijf Site" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

$AppDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Data directory aanmaken als die niet bestaat
$DataDir = Join-Path $AppDir "data"
if (-not (Test-Path $DataDir)) {
    New-Item -ItemType Directory -Path $DataDir -Force | Out-Null
}

# Start backend (Hono + tRPC) op poort 3001
Write-Host "[1/2] Backend starten op http://localhost:3001 ..." -ForegroundColor Yellow
$env:PORT=3001
$BackendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    $env:PORT=3001
    node "node_modules\tsx\dist\cli.mjs" api/boot.ts
} -ArgumentList $AppDir

Start-Sleep -Seconds 4

# Start frontend (Vite) op poort 3000
Write-Host "[2/2] Frontend starten op http://localhost:3000 ..." -ForegroundColor Yellow
$env:PORT=3000
$FrontendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    node "node_modules\vite\bin\vite.js" --port 3000
} -ArgumentList $AppDir

Start-Sleep -Seconds 6

Write-Host ""
Write-Host "==============================" -ForegroundColor Green
Write-Host " ✅ Site is live!" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host ""
Write-Host " 🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host " ⚙️  API:      http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host " 🔐 Admin login:" -ForegroundColor Yellow
Write-Host "    URL:     http://localhost:3000/login" -ForegroundColor White
Write-Host "    Email:   admin@admin.com" -ForegroundColor White
Write-Host "    Wachtwoord: admin123" -ForegroundColor White
Write-Host ""
Write-Host " Druk op een toets om de site te openen in je browser..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open de browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host " Druk op CTRL+C om de servers te stoppen." -ForegroundColor Red

# Wacht op beide jobs
Wait-Job $BackendJob, $FrontendJob | Out-Null
