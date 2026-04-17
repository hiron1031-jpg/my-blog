$files = @(
  "C:\Users\hiron\OneDrive\デスクトップ\Claude code\my-blog\content\posts\goukaku-career\index.mdx",
  "C:\Users\hiron\OneDrive\デスクトップ\Claude code\my-blog\content\posts\zouen-keiken-kijutsu\index.mdx",
  "C:\Users\hiron\OneDrive\デスクトップ\Claude code\my-blog\content\posts\keiken-kijutsu-kakikata\index.mdx",
  "C:\Users\hiron\OneDrive\デスクトップ\Claude code\my-blog\content\posts\sankosho-hikaku\index.mdx",
  "C:\Users\hiron\OneDrive\デスクトップ\Claude code\my-blog\content\posts\sekoukanri-goukakuritsu\index.mdx"
)

foreach ($file in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($file)
  if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    $newBytes = $bytes[3..($bytes.Length - 1)]
    [System.IO.File]::WriteAllBytes($file, $newBytes)
    Write-Host "BOM removed: $file"
  } else {
    Write-Host "No BOM: $file (first byte: $($bytes[0]))"
  }
}
