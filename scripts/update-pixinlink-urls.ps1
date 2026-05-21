$files = Get-ChildItem -Path src -Recurse -Include *.vue,*.ts,*.mjs,*.js,*.json | Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\generated\\' }
$files += Get-Item index.html
$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -notmatch 'pixinlink\.com') { continue }
    
    $orig = $content
    
    $content = [regex]::Replace($content,
        'https://pixinlink\.com/(\d+x\d+)/[a-fA-F0-9]+/[a-fA-F0-9]+(?:\?|&amp;)prompt=([^&"''\s>]+)(?:&(?:amp;)?style=\w+)?',
        {
            param($m)
            $dims = $m.Groups[1].Value
            $prompt = $m.Groups[2].Value
            $slug = [uri]::UnescapeDataString($prompt) -replace '\+', '-' -replace '[^a-zA-Zа-яА-ЯёЁ0-9-]', '-' -replace '-+', '-' -replace '^-|-$', ''
            "https://pixinlink.ru/api/v1/$dims/$slug"
        }
    )
    
    if ($content -ne $orig) {
        Set-Content $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $rel = $file.FullName -replace '^.*?src[\\/]', 'src/'
        Write-Host "✓ $rel"
        $count++
    }
}

Write-Host "Done. Updated $count files."
