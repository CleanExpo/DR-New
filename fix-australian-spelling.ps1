# Fix American English to Australian English Spelling
# For Brisbane-based Disaster Recovery business

Write-Host "==========================================="  -ForegroundColor Cyan
Write-Host "Australian English Spelling Converter" -ForegroundColor Cyan
Write-Host "Converting American to Australian spellings" -ForegroundColor Cyan
Write-Host "==========================================="  -ForegroundColor Cyan
Write-Host ""

# Track changes
$changesLog = @()
$filesChanged = @()

# Define spelling replacements (American -> Australian)
# Order matters - do specific patterns before general ones
$replacements = @(
    # -ize to -ise words (most common)
    @{Pattern = '\bspecialized\b'; Replacement = 'specialised'; Description = 'specialized -> specialised'},
    @{Pattern = '\bspecializing\b'; Replacement = 'specialising'; Description = 'specializing -> specialising'},
    @{Pattern = '\bspecialize\b'; Replacement = 'specialise'; Description = 'specialize -> specialise'},
    @{Pattern = '\bspecializes\b'; Replacement = 'specialises'; Description = 'specializes -> specialises'},

    @{Pattern = '\borganized\b'; Replacement = 'organised'; Description = 'organized -> organised'},
    @{Pattern = '\borganizing\b'; Replacement = 'organising'; Description = 'organizing -> organising'},
    @{Pattern = '\borganize\b'; Replacement = 'organise'; Description = 'organize -> organise'},
    @{Pattern = '\borganizes\b'; Replacement = 'organises'; Description = 'organizes -> organises'},

    @{Pattern = '\brecognized\b'; Replacement = 'recognised'; Description = 'recognized -> recognised'},
    @{Pattern = '\brecognizing\b'; Replacement = 'recognising'; Description = 'recognizing -> recognising'},
    @{Pattern = '\brecognize\b'; Replacement = 'recognise'; Description = 'recognize -> recognise'},
    @{Pattern = '\brecognizes\b'; Replacement = 'recognises'; Description = 'recognizes -> recognises'},

    # optimize/optimise - but NOT in technical contexts like /images/optimized/ or config files
    @{Pattern = 'optimized\b(?!")'; Replacement = 'optimised'; Description = 'optimized -> optimised (user-facing)'},
    @{Pattern = 'optimizing\b(?!")'; Replacement = 'optimising'; Description = 'optimizing -> optimising (user-facing)'},
    @{Pattern = 'optimize\b(?!")'; Replacement = 'optimise'; Description = 'optimize -> optimise (user-facing)'},
    @{Pattern = 'optimizes\b(?!")'; Replacement = 'optimises'; Description = 'optimizes -> optimises (user-facing)'},
    @{Pattern = '\boptimization\b'; Replacement = 'optimisation'; Description = 'optimization -> optimisation'},

    @{Pattern = '\bcustomized\b'; Replacement = 'customised'; Description = 'customized -> customised'},
    @{Pattern = '\bcustomize\b'; Replacement = 'customise'; Description = 'customize -> customise'},
    @{Pattern = '\bcustomizes\b'; Replacement = 'customises'; Description = 'customizes -> customises'},

    @{Pattern = '\bstandardized\b'; Replacement = 'standardised'; Description = 'standardized -> standardised'},
    @{Pattern = '\bstandardize\b'; Replacement = 'standardise'; Description = 'standardize -> standardise'},

    @{Pattern = '\bminimized\b'; Replacement = 'minimised'; Description = 'minimized -> minimised'},
    @{Pattern = '\bminimize\b'; Replacement = 'minimise'; Description = 'minimize -> minimise'},

    @{Pattern = '\bmaximized\b'; Replacement = 'maximised'; Description = 'maximized -> maximised'},
    @{Pattern = '\bmaximize\b'; Replacement = 'maximise'; Description = 'maximize -> maximise'},

    @{Pattern = '\bprioritized\b'; Replacement = 'prioritised'; Description = 'prioritized -> prioritised'},
    @{Pattern = '\bprioritize\b'; Replacement = 'prioritise'; Description = 'prioritize -> prioritise'},

    @{Pattern = '\bauthorized\b'; Replacement = 'authorised'; Description = 'authorized -> authorised'},
    @{Pattern = '\bauthorize\b'; Replacement = 'authorise'; Description = 'authorize -> authorise'},

    @{Pattern = '\butilized\b'; Replacement = 'utilised'; Description = 'utilized -> utilised'},
    @{Pattern = '\butilize\b'; Replacement = 'utilise'; Description = 'utilize -> utilise'},

    @{Pattern = '\bcategorized\b'; Replacement = 'categorised'; Description = 'categorized -> categorised'},
    @{Pattern = '\bcategorize\b'; Replacement = 'categorise'; Description = 'categorize -> categorise'},

    # -yze to -yse
    @{Pattern = '\banalyzed\b'; Replacement = 'analysed'; Description = 'analyzed -> analysed'},
    @{Pattern = '\banalyzing\b'; Replacement = 'analysing'; Description = 'analyzing -> analysing'},
    @{Pattern = '\banalyze\b'; Replacement = 'analyse'; Description = 'analyze -> analyse'},
    @{Pattern = '\banalyzes\b'; Replacement = 'analyses'; Description = 'analyzes -> analyses'},

    # -or to -our words (only in user-facing content, not CSS/color properties)
    @{Pattern = '\bbehavior\b'; Replacement = 'behaviour'; Description = 'behavior -> behaviour'},
    @{Pattern = '\bbehaviors\b'; Replacement = 'behaviours'; Description = 'behaviors -> behaviours'},
    @{Pattern = '\bflavor\b'; Replacement = 'flavour'; Description = 'flavor -> flavour'},
    @{Pattern = '\bhonor\b'; Replacement = 'honour'; Description = 'honor -> honour'},
    @{Pattern = '\blabor\b'; Replacement = 'labour'; Description = 'labor -> labour'},
    @{Pattern = '\bneighbor\b'; Replacement = 'neighbour'; Description = 'neighbor -> neighbour'},
    @{Pattern = '\bneighbors\b'; Replacement = 'neighbours'; Description = 'neighbors -> neighbours'},
    @{Pattern = '\bfavor\b'; Replacement = 'favour'; Description = 'favor -> favour'},
    @{Pattern = '\bvapor\b'; Replacement = 'vapour'; Description = 'vapor -> vapour'},

    # -er to -re words (context-specific)
    @{Pattern = '\bcenter\b'; Replacement = 'centre'; Description = 'center -> centre'},
    @{Pattern = '\bcenters\b'; Replacement = 'centres'; Description = 'centers -> centres'},
    @{Pattern = '\bcentered\b'; Replacement = 'centred'; Description = 'centered -> centred'},
    @{Pattern = '\bcentering\b'; Replacement = 'centring'; Description = 'centering -> centring'},
    @{Pattern = '\bfiber\b'; Replacement = 'fibre'; Description = 'fiber -> fibre'},
    @{Pattern = '\btheater\b'; Replacement = 'theatre'; Description = 'theater -> theatre'},

    # -ense to -ence words
    @{Pattern = '\bdefense\b'; Replacement = 'defence'; Description = 'defense -> defence'},
    @{Pattern = '\boffense\b'; Replacement = 'offence'; Description = 'offense -> offence'},

    # -og to -ogue words
    @{Pattern = '\bcatalog\b'; Replacement = 'catalogue'; Description = 'catalog -> catalogue'},
    @{Pattern = '\bdialog\b'; Replacement = 'dialogue'; Description = 'dialog -> dialogue'},
    @{Pattern = '\bdialogs\b'; Replacement = 'dialogues'; Description = 'dialogs -> dialogues'},

    # Double L words
    @{Pattern = '\bmodeling\b'; Replacement = 'modelling'; Description = 'modeling -> modelling'},
    @{Pattern = '\blabeled\b'; Replacement = 'labelled'; Description = 'labeled -> labelled'},
    @{Pattern = '\blabeling\b'; Replacement = 'labelling'; Description = 'labeling -> labelling'},
    @{Pattern = '\btraveled\b'; Replacement = 'travelled'; Description = 'traveled -> travelled'},
    @{Pattern = '\btraveling\b'; Replacement = 'travelling'; Description = 'traveling -> travelling'},
    @{Pattern = '\bcanceled\b'; Replacement = 'cancelled'; Description = 'canceled -> cancelled'},
    @{Pattern = '\bcanceling\b'; Replacement = 'cancelling'; Description = 'canceling -> cancelling'}
)

# Directories to process
$directories = @('app', 'components', 'lib')

# File extensions to process
$extensions = @('*.tsx', '*.ts', '*.md')

# Files/patterns to EXCLUDE (technical/config files)
$excludePatterns = @(
    '*node_modules*',
    '*package-lock.json',
    '*package.json',
    '*.json',
    '*tailwind.config*',
    '*next.config*',
    '*.css',
    '*.scss',
    '*build-log.txt',
    '*.log',
    '*analyze-*.js',
    '*image-worker*',
    '*.imageoptimization',
    '*analyze-platform*'
)

Write-Host "Processing directories: $($directories -join ', ')" -ForegroundColor Yellow
Write-Host "File types: $($extensions -join ', ')" -ForegroundColor Yellow
Write-Host ""

foreach ($dir in $directories) {
    $dirPath = Join-Path $PSScriptRoot $dir
    if (-not (Test-Path $dirPath)) {
        Write-Host "Skipping $dir (not found)" -ForegroundColor DarkGray
        Write-Host ""
        continue
    }

    Write-Host "Processing: $dir/" -ForegroundColor Green

    # Get all files with specified extensions
    $files = Get-ChildItem -Path $dirPath -Include $extensions -Recurse -File | Where-Object {
        $filePath = $_.FullName
        $exclude = $false
        foreach ($pattern in $excludePatterns) {
            if ($filePath -like $pattern) {
                $exclude = $true
                break
            }
        }
        -not $exclude
    }

    Write-Host "  Found $($files.Count) files to check" -ForegroundColor Cyan
    Write-Host ""

    foreach ($file in $files) {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
        if (-not $content) { continue }

        $originalContent = $content
        $fileChanges = @()

        foreach ($replacement in $replacements) {
            if ($content -match $replacement.Pattern) {
                $matchCount = ([regex]::Matches($content, $replacement.Pattern)).Count
                $content = $content -replace $replacement.Pattern, $replacement.Replacement
                $fileChanges += "$($replacement.Description) ($matchCount instance(s))"
            }
        }

        # Only write if changes were made
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            $relativePath = $file.FullName.Replace($PSScriptRoot, '').TrimStart('\')
            $filesChanged += $relativePath

            Write-Host "  OK " -ForegroundColor Green -NoNewline
            Write-Host "$relativePath" -ForegroundColor White
            foreach ($change in $fileChanges) {
                Write-Host "    - $change" -ForegroundColor DarkGray
                $changesLog += @{File = $relativePath; Change = $change}
            }
        }
    }
}

Write-Host ""
Write-Host "==========================================="  -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "==========================================="  -ForegroundColor Cyan
Write-Host ""
Write-Host "Total files changed: $($filesChanged.Count)" -ForegroundColor Green
Write-Host "Total changes made: $($changesLog.Count)" -ForegroundColor Green
Write-Host ""

if ($filesChanged.Count -gt 0) {
    Write-Host "Changed files:" -ForegroundColor Yellow
    foreach ($file in $filesChanged | Sort-Object) {
        Write-Host "  - $file" -ForegroundColor White
    }

    # Write detailed log
    $logPath = Join-Path $PSScriptRoot "australian-spelling-changes.log"
    $logLines = @()
    $logLines += "Australian English Spelling Changes"
    $logLines += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    $logLines += ""
    $logLines += "Total Files Changed: $($filesChanged.Count)"
    $logLines += "Total Changes: $($changesLog.Count)"
    $logLines += ""
    $logLines += "=" * 60
    $logLines += ""

    foreach ($file in $filesChanged | Sort-Object) {
        $logLines += $file
        $fileChangesItems = $changesLog | Where-Object { $_.File -eq $file }
        foreach ($item in $fileChangesItems) {
            $logLines += "  - $($item.Change)"
        }
        $logLines += ""
    }

    $logContent = $logLines -join "`r`n"
    Set-Content -Path $logPath -Value $logContent
    Write-Host ""
    Write-Host "Detailed log saved to: australian-spelling-changes.log" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "==========================================="  -ForegroundColor Cyan
Write-Host "Australian spelling conversion complete!" -ForegroundColor Green
Write-Host "==========================================="  -ForegroundColor Cyan
Write-Host ""
